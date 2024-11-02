import { atom } from "recoil";

export const moviesAtom = atom<JSX.Element[]>({
    key : 'moviesAtom',
    default : []
})
export const locationInput = atom<string>({
    key : 'locationInput',
    default : 'Location'
})
export const longitudeAtom = atom<string>({
    key : 'logitude',
    default: ''
})
export const latitudeAtom = atom<string>({
    key : 'latitude',
    default: ''
})
export const movieName = atom<string>({
    key : 'movieName',
    default : ''
})
export const showTiming = atom<string>({
    key : 'showTime',
    default : ''
})
export const theaterId = atom<number>({
    key : 'theater',
    default : 0
})
export const noOfSeats = atom<string>({
    key : "noOfSeats",
    default : "0"
})