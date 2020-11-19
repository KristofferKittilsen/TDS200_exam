import IComment from "./IComment";

//Inspired by lectures

interface ICommentList {
    trips_by_pk: {
        comments: IComment[];
    }
}

export default ICommentList;