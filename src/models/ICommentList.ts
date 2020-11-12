import IComment from "./IComment";

interface ICommentList {
    trips_by_pk: {
        comments: IComment[];
    }
}

export default ICommentList;