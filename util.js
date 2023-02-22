const clientSQS = require("@aws-sdk/client-sqs");
const Chance = require("chance");

const { SQSClient } = clientSQS;

const REGION = "us-west-2";
const sqsClient = new SQSClient ({ region: REGION});

const QUEUES = {
    RandomEvents: "https://sqs.us-west-2.amazonaws.com/240250763778/randomEvents.fifo",
    Navigation: "https://sqs.us-west-2.amazonaws.com/240250763778/Navigation.fifo"
};

const chance = new Chance();

module.exports = { sqsClient, QUEUES, chance };

