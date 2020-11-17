
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
        followers: {
            id: number;
            user_following: {
              id: number;
              display_name: string;
            }
            user_followers: {
              display_name: string;
            }
          }
        following: {
          user_followers: {
            display_name: string;
          }
        }
    }
}

export default ITrip;