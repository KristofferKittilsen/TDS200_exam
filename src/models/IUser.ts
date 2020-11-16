interface IUser {
    id: string;
    display_name: string;
    avatar_url: string;
    posts: {
        id: number;
        image_filename: string;
        trip_area: string;
        display_name: string;
        trip_description: string;
        how_long: number;
    }
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
}

export default IUser;