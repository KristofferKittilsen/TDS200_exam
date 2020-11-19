//Inspired by lectures

interface IUser {
    id: string;
    display_name: string;
    avatar_url: string;
    trips: {
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
          id: number;
          display_name: string;
        }
      }
    following: {
      id: number;
      user_followers: {
        display_name: string;
        id: string;
        trips: {
          image_filename: string;
        }
      }
      user_following: {
        display_name: string;
        id: string;
        trips: {
          image_filename: string;
        }
      }
    }
}

export default IUser;