import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
    action: 'profile'
  },
  {
    title: "Settings",
    icon: <Gear />,
    action: 'settings'
  },
  {
    title: "Sign-out",
    icon: <SignOut />,
    action: 'signout'
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
    url: "/chat"
  },
  {
    index: 1,
    icon: <Users />,
    url: "/group"
  },
  {
    index: 2,
    icon: <Phone />,
    url: "/call"
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const CallLogs = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "7:26",
    incoming: true,
    missed: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "6:18",
    incoming: true,
    missed: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "9:36",
    incoming: true,
    missed: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "12:56",
    incoming: true,
    missed: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "9:36",
    incoming: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "10:36",
    incoming: true,
    missed: true,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "9:39",
    incoming: true,
    missed: false,
    online: true,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "11:09",
    incoming: false,
    online: true,
  },
  {
    id: 8,
    img: faker.image.avatar(),
    name: faker.name.fullName(),
    number: faker.phone.number(),
    time: "12:46",
    incoming: false,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    image: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
    action: 'reply'
  },
  {
    title: "React to message",
    action: 'react'
  },
  {
    title: "Forward message",
    action: 'forward'
  },
  {
    title: "Star message",
    action: 'star'
  },
  {
    title: "Report",
    action: 'report'
  },
  {
    title: "Delete Message",
    action: 'delete'
  },
];

const SHARED_LINK = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.city(),
    message: "Yes, you can",
    incoming: true,
    outgoing: false
  },{
    type: "msg",
    subtype: "link",
    preview: faker.image.city(),
    message: "Yes, you can",
    incoming: true,
    outgoing: false
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.city(),
    message: "Yes, you can",
    incoming: false,
    outgoing: true
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.city(),
    message: "Yes, you can",
    incoming: true,
    outgoing: false
  }
]

const SHARED_DOCS = [
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.nature(),
    message: "Yes, I can",
    incoming: true,
    outgoing: false
  },
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.animals(),
    message: "Yes, I can",
    incoming: true,
    outgoing: false
  },
  {
    type: "msg",
    subtype: "doc",
    preview: faker.image.abstract(),
    message: "Yes, I can",
    incoming: false,
    outgoing: true
  }
]

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  CallLogs,
  Chat_History,
  Message_options,
  SHARED_LINK,
  SHARED_DOCS,
};
