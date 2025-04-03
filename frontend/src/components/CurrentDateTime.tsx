import { useEffect, useState } from "react";

export const CurrentDateTime = ({ format } : {
    format: "short" | "long";
}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let timer = setInterval(() => {
            setDate(new Date())
        }, 1000); 

        return () => clearInterval(timer);
    }, []);

    return <div className="flex gap-1">
        {format === "short" && <div>{date.toLocaleString('default', { hour12: true }) + ""}</div>}
        {format === "long" && <div>
            {date.toLocaleString('default', {  weekday: "long" }) + " "}
            {date.toLocaleString('default', { hour12: true, dateStyle: "medium", timeStyle: "medium" }) + ""}
        </div>}
    </div>

}