interface IFollowing {
    user_followers: {
        display_name: string;
        trips: {
            how_long: number;
            id: string;
            image_filename: string;
            latitude: number;
            longitude: number;
            rating: number;
            trip_area: string;
            trip_description: string;
            trip_difficulty: string;
            trip_type: string;
        }
    }
}

export default IFollowing;