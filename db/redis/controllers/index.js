const client = require('../../connect/redis');
const redis = require('redis');

module.exports = {
    postComment : function (req, res) {
        let email = req.body.email;
        let aadhar = req.body.aadhar;
        let candidateName = req.body.candidateName;
        let comment = req.body.comment;

        let uid = email.substr(0,email.indexOf("@"))+aadhar;
        let count = 1;
        
        client.hgetall(uid, (err, reply) => {
            if (reply) {
                let a = Object.keys(reply)[Object.keys(reply).length - 1];
                count = parseInt(a[a.length - 1]) + 1;
                let commentId = 'CID' + Math.floor(Math.random() * Math.floor(100000));
                client.hset(
                    uid,
                    "Candidate Name"+ count,
                    candidateName,
                    "CommentID"+ count,
                    commentId,
                    "Comment" + count,
                    comment,
                    "LikedBy",
                    "",
                    "Like" + count,
                    0,
                    "DislikedBy",
                    "",
                    "Dislike" + count,
                    0,
                    redis.print
                );
                return res.send(200);
            } else {
                let commentId = 'CID' + Math.floor(Math.random() * Math.floor(100000));
                client.hset(
                    uid,
                    "Candidate Name"+ count,
                    candidateName,
                    "CommentID"+ count,
                    commentId,
                    "Comment" + count,
                    comment,
                    "LikedBy",
                    "",
                    "Like" + count,
                    0,
                    "DislikedBy",
                    "",
                    "Dislike" + count,
                    0,
                    redis.print
                );
                return res.send(200);
            }
        });    
    },
    getComment : function(req, res) {
        let email = req.body.email;
        let aadhar = req.body.aadhar;
        let uid = email.substr(0,email.indexOf("@"))+aadhar;
        client.hgetall(uid, (err, reply)=>{
            return res.send(reply);
        });
    },
    likeComment: function(req, res) {
        let authorId = req.body.authorId;
        let commentId = req.body.commentId;
       // let count = parseInt(commentId.substr(3));
        let email = req.body.email;
        let aadhar = req.body.aadhar;
        let uid = email.substr(0,email.indexOf("@"))+aadhar;

        client.hgetall(authorId, (err, reply)=>{
            if(reply) {
                if(reply.LikedBy.includes(uid+":"+commentId)) {
                    return res.send(409);
                } else {
                    let likeCount = parseInt(Object.keys(reply).find(key=>reply[key]===commentId).substr(9));
                    client.hset(
                        authorId,
                        "LikedBy",
                        reply.LikedBy+" "+uid+":"+commentId,
                    (err, a)=>{
                        client.hincrby(authorId, "Like"+likeCount, 1, (err, b)=>{
                            return res.send(200);
                        })
                    });
                    
                }
            } else {
                return res.send(404);
            }
        });
    },
    dislikeComment: function(req, res) {
        let authorId = req.body.authorId;
        let commentId = req.body.commentId;
        let email = req.body.email;
        let aadhar = req.body.aadhar;
        let uid = email.substr(0,email.indexOf("@"))+aadhar;

        client.hgetall(authorId, (err, reply)=>{
            if(reply) {
                if(reply.DislikedBy.includes(uid+":"+commentId)) {
                    return res.send(409);
                } else {
                    let dislikeCount = parseInt(Object.keys(reply).find(key=>reply[key]===commentId).substr(9));
                    client.hset(
                        authorId,
                        "DislikedBy",
                        reply.DislikedBy+" "+uid+":"+commentId,
                    (err, a)=>{
                        client.hincrby(authorId, "Dislike"+dislikeCount, 1, (err, b)=>{
                            return res.send(200);
                        })
                    });
                    
                }
            } else {
                return res.send(404);
            }
        });
    }
}
