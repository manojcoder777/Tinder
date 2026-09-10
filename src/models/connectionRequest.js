const mongoose=require("mongoose");
const  connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["ignored","interested","accepeted","rejected"],
                message:`{VALUE} is incorrect status type`,
            },
        },
    },
    {
        timestramp:true
    }
);
connectionRequestSchema.index({fromUserId : 1,toUserId:2});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself");
    }
    next();
})

const connectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);