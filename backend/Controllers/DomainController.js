import AWS from 'aws-sdk';
import Route53 from "aws-sdk/clients/route53.js";
import 'dotenv/config';

AWS.config.update({
  accessKeyId: process.env.AccessID,
  secretAccessKey: process.env.AccessKey,
  region: process.env.region,
});

const route53 = new Route53();

export const listDomains = async (req, res) => {
  try {
    const result = await route53.listHostedZones().promise();
    return res.status(200).json({ "hostedZones": result.HostedZones });
  } catch (error) {
    console.error('Error listing hosted zones:', error);
    return res.status(500).json('Error listing hosted zones:', error);
  }
}

export const createHostedZone = async (req, res) => {
  try {
    const { domainName, description } = req.body;
    if (!domainName) {
      return res.status(400).json("Domain name is required");
    }

    const params = {
      CallerReference: `${Date.now()}`,
      Name: domainName,
      HostedZoneConfig: {
        Comment: description
      }
    };

    const result = await route53.createHostedZone(params).promise();
    return res.status(201).json(result.HostedZone.Id);
  } catch (error) {
    console.error('Error creating hosted zone:', error);
    return res.status(500).json('Error creating hosted zone:', error);
  }
}

export const deleteHostedZone = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const params = {
      Id: hostedZoneId,
    };
    await route53.deleteHostedZone(params).promise();
    return res.status(200).json("Successfully deleted the hosted zone");
  } catch (error) {
    return res.status(500).json('Error deleting hosted zone:', error);
  }
}

export const updateDomain = async (req, res) => {
  try {
    const { hostedZoneId } = req.params;
    const { description } = req.body;

    if (!hostedZoneId) {
      return res.status(400).json("Hosted zone ID is required");
    }

    if (!description) {
      return res.status(400).json("Description is required");
    }

    const params = {
      Id: hostedZoneId,
      Comment: description
    };

    const result = await route53.updateHostedZoneComment(params).promise();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating hosted zone:', error);
    return res.status(500).json('Error updating hosted zone:', error);
  }
}
