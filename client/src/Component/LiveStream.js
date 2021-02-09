import { GetStreams } from '../Helper/Stream';
import { useEffect } from 'react';
const LiveStreams = () => {
    useEffect(() => {
        setTimeout(() =>
            GetStreams().then((response) => console.log(response))
            , 3000)
    })
    return (<div>Streams</div>)
}
export default LiveStreams;