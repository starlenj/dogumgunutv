import axios from 'axios';
export const GetStreams = async () => {
    return await axios.get("http://localhost:8888/api/streams");
}