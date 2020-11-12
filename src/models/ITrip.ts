
interface ITrip {
    id: number;
    trip_type: string;
    how_long: number;
    rating: number;
    trip_area: string;
    trip_difficulty: string;
    image_filename: string;
    trip_description: string;
    longitude: number;
    latitude: number;
    user: {
        id: string;
        display_name: string;
        avatar_url: string;
    }
}

export default ITrip;