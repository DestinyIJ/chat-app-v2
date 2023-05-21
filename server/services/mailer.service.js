const fs = require('node:fs');

require("dotenv").config()
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');

const { default: cloudinary } = require('../config/cloudinary.config');


class MailService {
    constructor() {}
  
    sendMail(options) {
      // This method should be implemented by a concrete mail service class
      // It takes an `options` object that specifies the details of the email to be sent
      // It should return a promise that resolves when the email has been successfully sent, or rejects with an error if there was a problem sending the email
      throw new Error('sendMail method not implemented');
    }
  
    readFile(filePath) {
      // This method should be implemented by a concrete mail service class
      // It takes the path to a file on the local file system and returns a promise that resolves with the contents of the file
      // This method is used by the `MailController` class to read the contents of file attachments specified in the `options` object passed to the `sendMail` method
      throw new Error('readFile method not implemented');
    }
  
    downloadFile(url) {
      // This method should be implemented by a concrete mail service class
      // It takes the URL of a file and returns a promise that resolves with the contents of the file
      // This method is used by the `MailController` class to download files specified as URLs in the `options` object passed to the `sendMail` method
      throw new Error('downloadFile method not implemented');
    }
  
    getContentTypeFromFilename(filename) {
      // This method should be implemented by a concrete mail service class
      // It takes a filename and returns a string representing the MIME type of the file
      // This method is used by the `MailController` class to determine the content type of files specified as URLs in the `options` object passed to the `sendMail` method
      throw new Error('getContentTypeFromFilename method not implemented');
    }
  
    convertToICalendar(event) {
      // This method should be implemented by a concrete mail service class
      // It takes a calendar event object and returns a string containing the event in iCalendar format
      // This method is used by the `MailController` class to convert calendar events specified in the `options` object passed to the `sendMail` method to the appropriate format for inclusion as an attachment in the email message
      throw new Error('convertToICalendar method not implemented');
    }
}

class Mailer {
    constructor(mailService) {
      this.mailService = mailService;
    }
  
    async sendMail(options) {
      if (options.attachments) {
        const attachments = await this._prepareAttachments(options.attachments);
        options.attachments = attachments;
      }

      if (options.calendarEvent) {
        // Calendar event specified, so convert it to an iCalendar string
        const icsString = this.mailService.convertToICalendar(options.calendarEvent);
        options.icalEvent = { content: icsString };
      }

      if (options.fileUrls) {
        // File URLs specified, so convert them to an array of attachment objects
        options.attachments = await Promise.all(
          options.fileUrls.map(async (fileUrl) => {
            // Download the file content from the URL and convert it to an object with a filename and content type
            const content = await this.mailService.downloadFile(fileUrl);
            const filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
            const contentType = this.mailService.getContentTypeFromFilename(filename);
            return {
              filename: filename,
              content: content,
              contentType: contentType
            };
          })
        );
      }
  
      return this.mailService.sendMail(options);
    }
  
    async _prepareAttachments(attachments) {
      if (!attachments) {
        return null;
      }
  
      const preparedAttachments = [];
  
      for (const attachment of attachments) {
        if (attachment.type === 'file') {
          const content = await this.mailService.readFile(attachment.path);
          preparedAttachments.push({ filename: attachment.filename, content });
        } else if (attachment.type === 'url') {
          const content = await this.mailService.downloadFile(attachment.path);
          const contentType = this.mailService.getContentTypeFromFilename(attachment.filename);
          preparedAttachments.push({ filename: attachment.filename, content, contentType });
        } else if (attachment.type === 'calendar') {
          const content = this.mailService.convertToICalendar(attachment.event);
          preparedAttachments.push({ filename: attachment.filename, content, contentType: 'text/calendar' });
        }
      }
  
      return preparedAttachments;
    }
}

// node mailer
class NodeMailerService extends MailService {
    constructor() {
      super();
      this.transporter = this.createTransporter()
    }

    createTransporter() {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_KEY
            },
          })
    }
  
    async sendMail(options) {
      const mailOptions = {
        from: options.from || process.env.APP_EMAIL_ADDRESS,
        to: options.to,
        cc: options?.cc,
        bcc: options?.bcc,
        subject: options.subject,
        text: options?.text,
        html: options?.html,
        attachments: options?.attachments
      };

      return new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    }
  
    async readFile(filePath) {
      // Code to read a file from the local file system and return its contents as a buffer
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  
    async downloadFile(fileUrl) {
      // Code to download a file from a remote URL and return its contents as a buffer
      return cloudinary.api.resources(
        { url: fileUrl, type: 'fetch' },
        (error, result) => {
          if (error) {
            throw new Error(`Failed to download file: ${error.message}`);
          }
          return result.secure_url;
        }
      );
    }
  
    getContentTypeFromFilename(filename) {
      // Code to determine the MIME type of a file based on its extension
      const ext = filename.split('.').pop();
      switch (ext) {
        case 'pdf':
          return 'application/pdf';
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        default:
          return 'application/octet-stream';
      }
    }
  
    convertToICalendar(event) {
      // Code to convert a calendar event object to an iCalendar string
      return ical({
        domain: 'example.com',
        name: event.title,
        timezone: 'America/New_York',
        events: [
          {
            start: event.start,
            end: event.end,
            summary: event.title,
            location: event.location,
            description: event.description,
            url: 'https://example.com'
          }
        ]
      }).toString();
    }
}

class SendGridMailService extends MailService {
    constructor() {
        super();
        this.apiKey = process.env.SENDGRID_API_KEY
        this.setApiKey(this.apiKey)
    }

    setApiKey (key) {
        sgMail.setApiKey(key)
    }

    async sendMail(options) {
        const mailOptions = {
          from: options.from || process.env.APP_EMAIL_ADDRESS,
          to: options.to,
          cc: options?.cc,
          bcc: options?.bcc,
          subject: options.subject,
          text: options?.text,
          html: options?.html,
          attachments: options?.attachments
        };
  
        return new Promise((resolve, reject) => {
          sgMail.send(mailOptions, (error, info) => {
            if (error) {
              reject(error);
            } else {
              resolve(info);
            }
          });
        });
    }
}

// node-mailer
const nodeMailerService = new NodeMailerService();
// send-grid
// const sendGridMailService = new SendGridMailService();


const mailer = new Mailer(nodeMailerService)

module.exports = mailer