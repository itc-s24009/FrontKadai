import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

export type team = {
    id: string;
    name: string;
    usechara: string;
    career: string;
  info: string;
  x_url: string;
  youtube_url: string;
  twitch_url: string;
  image: MicroCMSImage
  
} & MicroCMSListContent
export type StatField = {
  fieldId: "statItem"; // 設定したカスタムフィールドID
  label: string;
  value: string;
};

export type history = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  intro: string;
  paragraphs: string;
  gallery: MicroCMSImage[];
  stats: StatField[]
} & MicroCMSListContent

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});


export const getteamList = async (
  queries?: MicroCMSQueries
) => {
  const listteamData = await client.getList<team>({
    endpoint: 'team-info',
    queries,
  });
  return listteamData;
};

export const getteammember = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const memberData = await client.get<team>({
    endpoint: 'team-info',
    contentId,
    queries,
  });
  return memberData;
};

export const getHistoryList = async (queries?: MicroCMSQueries) => {
  const listhistoryData = await client.getList<history>({
    endpoint: 'history-info',
    queries,
  });
  return listhistoryData;
};

