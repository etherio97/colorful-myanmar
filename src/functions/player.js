import axios from "axios";

export default async function player(serverURL, id) {
  const { data } = await axios(`${serverURL}/v/${id}`);
  const thumbnails = data.thumbnails;
  const title = data.title;
  const sources = data.audios.map((audio) => ({
    url: audio.url,
    type: audio.mimeType.split(";")[0],
  }));
  return {
    thumbnails,
    title,
    sources,
  };
}
