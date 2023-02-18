// const { SendMessageCommand } = require('@aws-sdk/client-sqs');
// const { sqsClient, chance, QUEUES } = require('../utils');

// async function sendPickup(vendorId) {
//   const event = {
//     vendor: vendorId,
//     store: chance.city(),
//     orderId: chance.guid(),
//     customer: chance.name({ nationality: 'en' }),
//     address: chance.address(),
//   };

//   // incoporate inquirer in order for user to make choices???
//   console.log(`Vendor, ${event.vendor} is requesting pickup for`, event);

//   try {
//     const message = await sqsClient.send(
//       new SendMessageCommand({
//         MessageBody: JSON.stringify(event),
//         MessageGroupId: vendorId,
//         QueueUrl: QUEUES.Pickup,
//       })
//     );
//     console.log('Vendor has sent a pickup request!', message.MessageId);
//     return message;
//   } catch (error) {
//     console.error('Failed to send pickup message to queue', error);
//   }
// }

// module.exports = { sendPickup };

// Creating/using assets - api gateway 
// handler for adding and deleting assets 