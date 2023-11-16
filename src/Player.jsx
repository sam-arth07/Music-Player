
//imports 
import { useState } from 'react'
import {tracks} from './assets/tracks'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavigateBeforeRounded } from '@mui/icons-material';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect } from 'react';
import { Box, ButtonGroup, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useTheme } from '@mui/material/styles';

//initial audio
let audio = new Audio(tracks[0].src)
let title = tracks[0].title

//helper functions
function getDuration () {
    return `${Math.floor(audio.duration / 60)} : ${Math.floor(audio.duration % 60)}` 
}
function getCurrentTime () {
    return `${Math.floor(audio.currentTime/60)} : ${Math.floor(audio.currentTime%60)}`
}
 
export default function Player() {
    const theme = useTheme();
    const [isClicked,setIsClicked] = useState(false) //to provide functionality to play and pause logic
    const [trackId,setTrackId] = useState(0) //to track which song is playing at any moment
    
    //To Re-render the component every second
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
        setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    //provides play and pause functionality
    const play_pause = () => {
        if (isClicked){
            audio.pause()
        }else{
            audio.play()
        }
        setIsClicked(!isClicked)
    }

    //handles playing next track
    const handleNext = (trackId) => {
        audio.pause()
        if(trackId===tracks.length-1){
            trackId = 0
        }
        else{
            trackId += 1 
        }
        tracks.filter(track=>{
            if(track.id === trackId){
                audio = new Audio(tracks[trackId].src)
                title = tracks[trackId].title
                audio.play()
                setIsClicked(false)
            }
        })
        setTrackId(trackId)
        setIsClicked(true)
    }

    //handles playing prev track
    const handlePrev = (trackId) => {
        audio.pause()
        if(trackId===0){
            trackId = tracks.length - 1
        }
        else{
            trackId -= 1 
        }
        tracks.filter(track=>{
            if(track.id === trackId){
                audio = new Audio(tracks[trackId].src)
                title = tracks[trackId].title
                audio.play()
                setIsClicked(false)
            }
        })
        setTrackId(trackId)
        setIsClicked(true)
    }
    const normal = ()=> {
            audio.playbackRate = 1
    }
    const fastForward = ()=> {
            audio.playbackRate = 2
    }
    if (getCurrentTime()===getDuration()){
        handleNext(trackId)
    }
    return(
        
        <>
        <Typography component="div" variant="overline" fontSize={26} gutterBottom>
            Current Track:
        </Typography>
        <Card sx={{ display: 'flex'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' ,width:172}}>

            <CardContent sx={{ flex: '1 0 auto'}}>
                <Typography component="div" variant="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {getCurrentTime()} / {getDuration()}
                </Typography>
                
            </CardContent>

            <Box sx={{ display: 'flex',alignItems: 'center', pl: 1, pb: 1 }}>
                <ButtonGroup orientation='vertical'>
                    <ButtonGroup sx={{alignItems:'center', pl: 3 }}>
                        <IconButton aria-label="set playback to 1x" onClick={()=>normal()}>
                            <FastRewindIcon sx={{ height: 30, width: 30 }}/>
                        </IconButton>
                        <IconButton aria-label="set playback to 2x" onClick={()=>fastForward()}>
                            <FastForwardIcon sx={{ height: 30, width: 30 }}/>
                        </IconButton>
                    </ButtonGroup>
                    <ButtonGroup>
                        <IconButton aria-label="previous" onClick={()=>handlePrev(trackId)}>
                            <NavigateBeforeRounded sx={{ height: 30, width: 30 }}/>
                        </IconButton>
                        <IconButton aria-label="play/pause" onClick={play_pause}>
                            { isClicked ? <PauseIcon sx={{ height: 38, width: 38 }} />:<PlayArrowIcon sx={{ height: 38, width: 38 }}/>}
                        </IconButton>
                        <IconButton aria-label="next" onClick={()=>handleNext(trackId)}>
                            <NavigateNextIcon sx={{ height: 30, width: 30 }}/>
                        </IconButton>
                    </ButtonGroup>
                </ButtonGroup>
            </Box>
        </Box>
            
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={tracks[trackId].img}
        />
        
        </Card>     
        </>
    )
}