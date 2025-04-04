import html2canvas from "html2canvas";
import { useDriverStore } from '../state-store/useDriverStore';
import { FaDownload, FaShare } from "react-icons/fa";

const DownloadShare = () => {
    const { logs, statusMessage, signature } = useDriverStore();

    // Setting share & download div functionality
    const createResultElement = () => {
        const element = document.createElement("div");
        element.style.width = "700px";
        element.style.height = "550px";
        element.style.padding = "5px";
        element.style.position = "fixed";
        element.style.right = "-99%";
        element.style.top = "10%";
        element.innerHTML = `
   <div class="log-container">
    <div class="log-header">
        <p><strong>Driver:</strong> <span id="driverName">${logs && logs.driverName}</span></p>
        <p><strong>Truck Number:</strong> <span id="truckNumber">${logs && logs.truckNumber}</span></p>
        <p><strong>Carried Product:</strong> <span id="carriedProduct">${logs && logs.carriedProduct}</span></p>
        <p><strong>Total Miles:</strong> <span id="totalMiles">${logs && logs.totalMiles}</span></p>
    </div>
    <h3 class="log-date">Date: <span id="logDate">${logs && logs.date}</span></h3>
    
    <div class="log-table-container">
        <table class="log-table">
            <thead>
                <tr>
                    <th class="table-header">Duty Status</th>
                    <th class="table-header">0:00 - 11:59</th>
                    <th class="table-header">12:00 - 17:59</th>
                    <th class="table-header">18:00 - 23:59</th>
                    <th class="table-header">Total</th>
                </tr>
            </thead>
            <tbody>
                <!-- OFF DUTY ROW -->
                <tr class="log-row">
                    <td class="log-cell">OFF DUTY</td>
                    <td class="log-cell">${logs && logs.offDutyHours['0:00-11:59']}</td>
                    <td class="log-cell">${logs && logs.offDutyHours['12:00-17:59']}</td>
                    <td class="log-cell">${logs && logs.offDutyHours['18:00-23:59']}</td>
                    <td class="log-cell">
                        ${logs && Object.values(logs.offDutyHours).reduce((sum, hours) => sum + hours, 0)}
                    </td>
                </tr>

                <!-- DRIVING ROW -->
                <tr class="log-row">
                    <td class="log-cell">DRIVING</td>
                    <td class="log-cell">${logs && logs.drivingHours['0:00-11:59']}</td>
                    <td class="log-cell">${logs && logs.drivingHours['12:00-17:59']}</td>
                    <td class="log-cell">${logs && logs.drivingHours['18:00-23:59']}</td>
                    <td class="log-cell">
                        ${logs && Object.values(logs.drivingHours).reduce((sum, hours) => sum + hours, 0)}
                    </td>
                </tr>

                <!-- SLEEPER BERTH ROW -->
                <tr class="log-row">
                    <td class="log-cell">SLEEPER BERTH</td>
                    <td class="log-cell">${logs && logs.sleeperBerthHours['0:00-11:59']}</td>
                    <td class="log-cell">${logs && logs.sleeperBerthHours['12:00-17:59']}</td>
                    <td class="log-cell">${logs && logs.sleeperBerthHours['18:00-23:59']}</td>
                    <td class="log-cell">
                        ${logs && Object.values(logs.sleeperBerthHours).reduce((sum, hours) => sum + hours, 0)}
                    </td>
                </tr>

                <!-- ON DUTY ROW -->
                <tr class="log-row">
                    <td class="log-cell">ON DUTY</td>
                    <td class="log-cell">${logs && logs.onDutyHours['0:00-11:59']}</td>
                    <td class="log-cell">${logs && logs.onDutyHours['12:00-17:59']}</td>
                    <td class="log-cell">${logs && logs.onDutyHours['18:00-23:59']}</td>
                    <td class="log-cell">
                        ${logs && Object.values(logs.onDutyHours).reduce((sum, hours) => sum + hours, 0)}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Status Message -->
    <p class="status-message">${logs && logs.isBelowAverage ? statusMessage : ''}</p>

    <!-- Signature Section -->
    <div class="signature-section">
        <label for="signature" class="signature-label">Driver's Signature:</label>
        <input id="signature" type="text" class="signature-input" value="${signature}" placeholder="Enter your name to sign">
    </div>
</div>

    `;
        return element;
    };

    // Function for downloading individual Trip logs
    const downloadIndividualResult = () => {
        try {
            const element = createResultElement();
            document.body.appendChild(element);
            html2canvas(element).then(canvas => {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = `${logs && logs.driverName}_result.png`;
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
    const generateCanvasAndShare = async () => {
        const element = createResultElement();

        document.body.appendChild(element);

        const canvas = await html2canvas(element);
        const imageDataUrl = canvas.toDataURL('image/png');

        document.body.removeChild(element); // Clean up the added sharaeable div

        // Share the image if no error
        try {
            await navigator.share({
                title: `Trip Result for: ${logs && logs.driverName}`,
                text: `Check out my Trip result!`,
                files: [
                    new File([await fetch(imageDataUrl).then(res => res.blob())], `${logs && logs.driverName}_result.png`, { type: 'image/png' })
                ],
            });
            alert('Trip result shared successfully!');
        } catch (error) {
            alert(`Error sharing:' ${error}`);
        }
    };

    return (
        <div className="flex gap-2 items-center justify-center mt-4 text-sm">
            <button
                onClick={() => downloadIndividualResult()}
                className="flex items-center cursor-pointer gap-1 bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-1 rounded transition"
                title="Download trip log"
            >
                <FaDownload className="text-sm" /><span className="text-[11px] max-sm:hidden">Download</span>
            </button>
            <button
                onClick={() => generateCanvasAndShare()}
                className="flex items-center cursor-pointer gap-1 bg-green-500 hover:bg-green-600 text-white font-bold p-1 rounded transition"
                title="Share trip log"
            >
                <FaShare className="text-sm" /><span className="text-[11px] max-sm:hidden">Share</span>
            </button>
        </div>
    );
}

export default DownloadShare;