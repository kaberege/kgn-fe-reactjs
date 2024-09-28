import React from "react";
import useQuizStore from "./QuizStore";


export default function HandleTime() {
    const time = useQuizStore(state => state.time);
    function handleTime(currenttime) {
        let s = currenttime % 60;
        let m = parseInt(currenttime / 60) % 60;
        let h = parseInt(currenttime / 3600);
        const seconds = s < 10 ? `0${s}` : s;
        const minutes = m < 10 ? `0${m}` : m;
        const hours = h < 10 ? `0${h}` : h;
        let timeValue = `${hours}:${minutes}:${seconds}`;
        return timeValue;
    }
    return (
        <div>{handleTime(time)}</div>
    );
}