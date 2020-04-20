import TripDatapoint from "./TripDatapoint";

export default interface TripDataset
{
    name: string;
    data: Array<TripDatapoint>;
}