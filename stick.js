const fs = require('fs');

let stickyData = {
  content: '',
  channel: '',
  maxStickMessageCount: 1,
  count: 0,
  lastStickyMessage: null
};

function loadStickyData() {
  try {
    const data = fs.readFileSync('./stickyData.json');
    stickyData = JSON.parse(data);
    console.log('Sticky data loaded successfully.');
  } catch (error) {
    console.log('Failed to load sticky data:', error);
  }
}

function saveStickyData() {
  try {
    const data = JSON.stringify(stickyData);
    fs.writeFileSync('./stickyData.json', data);
    console.log('Sticky data saved successfully.');
  } catch (error) {
    console.log('Failed to save sticky data:', error);
  }
}

async function handleStick(message, stickyData) {
  if (message.content.toLowerCase().startsWith('>stick')) {
    if (!message.member.permissions.has('KICK_MEMBERS')) return;
    let contentToStick = message.content.split(' ').slice(1).join(' ');
    if (!contentToStick) return message.channel.send('Must provide a message to stick!');

    stickyData.content = contentToStick;
    stickyData.channel = message.channel.id;
    stickyData.lastStickyMessage = await message.channel.send(stickyData.content);
    stickyData.count = 0;

    await message.delete();
    saveStickyData(); // Save sticky data after updating
  }
}

function handleUnstick(message, stickyData) {
  if (message.content.toLowerCase().startsWith('>unstick')) {
    stickyData.content = '';
    if (stickyData.lastStickyMessage) {
      stickyData.lastStickyMessage.delete();
      stickyData.lastStickyMessage = null;
    }
    stickyData.channel = '';
    message.channel.send('Successfully removed the message!');
    saveStickyData(); // Save sticky data after updating
  }
}

module.exports = {
  handleStick,
  handleUnstick,
  loadStickyData,
  saveStickyData
};
