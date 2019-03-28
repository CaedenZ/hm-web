import { SyntheticEvent } from "react";

interface ImageEventTarget extends EventTarget {
    src:string;
}

interface ImageEvent extends SyntheticEvent<HTMLImageElement, Event> {
    target: ImageEventTarget;
}

export default ImageEvent;