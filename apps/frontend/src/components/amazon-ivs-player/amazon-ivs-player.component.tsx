import React, { FC, useCallback, useEffect, useRef } from 'react';
import { 
  registerIVSTech, 
  registerIVSQualityPlugin,
  VideoJSIVSTech,  
  VideoJSQualityPlugin 
} from 'amazon-ivs-player';
import videojs from 'video.js';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import getAbsolutePath from '../../utils/get-absolute-path.utils';
import { 
  playerOptions,
  wasmBinaryPath, 
  wasmWorkerPath 
} from '../../constants/amazon-ivs-player.constants';
import { IAmazonIVSPlayerProps } from './amazon-ivs-player.types';
import 'video.js/dist/video-js.css';


const AmazonIVSPlayer: FC<IAmazonIVSPlayerProps> = (
  { playbackURL }: IAmazonIVSPlayerProps
) => {
  const video = useRef<HTMLVideoElement | null>(null);
  const player = useRef<videojs.Player & VideoJSIVSTech & VideoJSQualityPlugin | null>(null);

  const createPlayer = useCallback(() => {
    if (!video.current) {
      return;
    }

    const path = getAbsolutePath(wasmBinaryPath);

    registerIVSTech(videojs, {
      wasmBinary: getAbsolutePath(wasmBinaryPath),
      wasmWorker: getAbsolutePath(wasmWorkerPath)
    });

    registerIVSQualityPlugin(videojs);

    player.current = videojs(
      video.current,
      playerOptions
    ) as videojs.Player & VideoJSIVSTech & VideoJSQualityPlugin;

    player.current.ready(() => {
      player.current?.enableIVSQualityPlugin();
      player.current?.src(playbackURL);
    });
  }, [playbackURL]);

  const removePlayer = useCallback(() => {
    if (!video.current) {
      return;
    }

    player.current?.dispose();

    player.current = null;
  }, []);

  // @ts-ignore
  useEffect(() => {
    if (player.current) {
      return () => { removePlayer(); }
    }

    createPlayer();
  }, [createPlayer, removePlayer]);

  return (
    <Box
      id="video-container" 
      height="470px" 
      width="800px" 
      position="relative"
      border={`5px double ${blue[600]}`}
    >
	    <video
		    ref={video}
        className="video-js vjs-fluid vjs-big-play-centered"
	    />
	  </Box>
  )
};

export default AmazonIVSPlayer;