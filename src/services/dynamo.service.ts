import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { ITask } from "../interfaces/task.interface";

const client: DynamoDBClient = new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" });
const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME: string = process.env.TABLE_NAME || "tasks";

export const createTask = async (task: ITask): Promise<ITask> => {
  const params = {
    TableName: TABLE_NAME,
    Item: task,
  };
  const command = new PutCommand(params);
  await docClient.send(command);
  return task;
};

export const getAllTasks = async (): Promise<ITask[]> => {
  const params = { TableName: TABLE_NAME };
  const command = new ScanCommand(params);
  const result = await docClient.send(command);

  return (result.Items as ITask[]) || [];
};

export const getTaskById = async (id: string): Promise<ITask | null> => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  const command = new GetCommand(params);
  const result = await docClient.send(command);

  return (result.Item as ITask) || null;
};

export const deleteTask = async (id: string): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  const command = new DeleteCommand(params);
  await docClient.send(command);
};
