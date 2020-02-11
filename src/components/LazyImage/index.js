import React,{useState,useEffect} from 'react';
import {Animated} from "react-native"
import { Small ,Original} from './styled';

const OriginalAnimated = Animated.createAnimatedComponent(Original)

export default function LazyImage(props) {
    const {smallSource,source,aspectRatio,shouldLoad} = props
    const opacity = new Animated.Value(0)
    function handleAnimat(){
        Animated.timing(opacity,{
            toValue:1,
            duration:500,
            useNativeDriver:true
        })
    }
    return (
        <Small 
            source={smallSource} 
            ratio={Number(aspectRatio)}
            resizeMode="contain"
            blurRadius={2}
        >
            <OriginalAnimated
                source={source}
                ratio={Number(aspectRatio)}
                resizeMode="contain"
                onLoadEnd={()=>handleAnimat()}

            />
        </Small>
    );
}
