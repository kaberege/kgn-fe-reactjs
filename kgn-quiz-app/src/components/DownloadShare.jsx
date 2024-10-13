import React from "react";
import html2canvas from "html2canvas";
import { FaDownload, FaShare } from "react-icons/fa";
import logoUrl from "../assets/logo-png1.png";

const DownloadShare = ({ shareable }) => {

     // Setting sharaeable & downloadable div
    const createResultElement = (item) => {
        const element = document.createElement("div");
        element.style.width = "320px";
        element.style.padding = "20px";
        element.style.border = "1px solid #ccc";
        element.style.borderRadius = "8px";
        element.style.backgroundColor = "#f9f9f9";
        element.style.fontFamily = "Arial, sans-serif";
        element.style.color = "#333";
        element.style.position = "fixed";
        element.style.left = "-50%";
        element.innerHTML = `
        <div style="text-align: center;">
            <img src="${logoUrl}" alt="Logo" style="width: 100px; margin-bottom: 10px; border-radius: 50%; margin: 0 auto 0 auto" />
            <h2>Topic: <strong>${item.topic}</strong></h2>
            <h3>Difficulty: ${item.level}</h3>
            <p>Score: ${item.scored}%</p>
            <p>Time taken: ${item.spent.hours}:${item.spent.minutes}:${item.spent.seconds}</p>
            <p>Date: ${item.date}</p>
        </div>
    `;
        return element;
    };

    // Function for downloading individual quiz history
    const downloadIndividualResult = (item) => {
        try {
            const element = createResultElement(item);
            document.body.appendChild(element);
            html2canvas(element).then(canvas => {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = `${item.topic}_result.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                document.body.removeChild(element); // Clean up the added sharaeable div
            });
        } catch (error) {
            alert(error);
        }
    }

    // Function to share the results to social media platforms
    const generateCanvasAndShare = async (item) => {
        const element = createResultElement(item);

        document.body.appendChild(element);

        const canvas = await html2canvas(element);
        const imageDataUrl = canvas.toDataURL('image/png');

        document.body.removeChild(element); // Clean up the added sharaeable div

        // Share the image
        try {
            await navigator.share({
                title: `Quiz Result: ${item.topic}`,
                text: `Check out my quiz result!`,
                files: [
                    new File([await fetch(imageDataUrl).then(res => res.blob())], `${item.topic}_result.png`, { type: 'image/png' })
                ],
            });
            alert('Result shared successfully!');
        } catch (error) {
            console.error('Error sharing:', error);
            alert('Error sharing:', error);
        }
    };

    return (
        <div className="flex gap-2 mt-2 justify-end text-sm">
            <button onClick={() => downloadIndividualResult(shareable)} className="flex items-center bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-1 rounded transition">
                <FaDownload className="mr-2" /> Download
            </button>
            <button onClick={() => generateCanvasAndShare(shareable)} className="flex items-center bg-green-500 text-white p-1 rounded hover:bg-green-600 transition">
                <FaShare className="mr-2" /> Share
            </button>
        </div>
    );
}

export default DownloadShare;