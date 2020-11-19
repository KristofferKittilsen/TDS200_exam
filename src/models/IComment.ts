//Inspired by lectures

interface IComment {
    id: number;
    text: string;
    rating: number;
    user: {
        display_name: string;
        avatar_url: string;
    }
}

export default IComment;