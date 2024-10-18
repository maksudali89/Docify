import { DocModel } from "../models/docModel.js";
import { User } from "../models/userModel.js";

export async function HandlerForCreateNewDocument(req, res) {
  const { userId, title } = req.body;
  const user = await User.findById(userId);
  if (user) {
    const docs = await DocModel.create({
      title: title,
      uploadedBy: user._id,
    });
    return res.json({
      success: true,
      message: "Document Created SuccessFully",
      docId: docs._id,
    });
  } else {
    return res.json({ success: false, message: "Invalid Error" });
  }
}

export async function HandlerForUpdateDocumentContent(req, res) {
  const { userId, docId, content } = req.body;
  const user = await User.findById(userId);
  // console.log(docId)
  if (user) {
    const doc = await DocModel.findByIdAndUpdate(docId, { content: content });
    if (doc) {
      return res.json({
        success: true,
        message: "Document Updated SuccessFully",
        doc: doc,
      });
    } else {
      return res.json({ success: false, message: "Document Updated Failed" });
    }
  } else {
    return res.json({ success: false, message: "InValid User Try" });
  }
}

export async function HandlerForGettingDocumentForDisplay(req, res) {
  //   const { userId, docsId } = req.body;
  const { userId, docId } = req.query;
  // console.log(userId)
  const user = await User.findById(userId);
  //   console.log(user);
  if (user) {
    const docs = await DocModel.findById(docId);
    if (docs) {
      return res.json({
        success: true,
        message: "Document fetched SuccessFully",
        doc: docs,
      });
    } else {
      return res.json({ success: false, message: "Document Not Found" });
    }
  } else {
    return res.json({ success: false, message: "InValid User" });
  }
}

 export async function HandlerForGetAllDocs(req, res) {
    const userId =  req.query.userId;
    const user =  await User.findById(userId);
    // console.log(user)
    if(user){
        const docs =  await DocModel.find({uploadedBy:userId});
        // console.log(docs)
        if(docs){
            return res.json({success:true,message:"Document Fetched SuccessFully",docs:docs});
        }else{
            return res.json({success:false,message:"Document Fetched Failed"});
        }
    }else{
        return res.json({success:false,message:"InValid Users"});
    }
  }
  export async function HandlerForDeleteDocument(req,res){
    const {userId,docId} = req.query;
    const user  = await User.findById(userId);
    if(user){
        const doc = await DocModel.findByIdAndDelete(docId);
        if(doc){
          return res.json({success:true,message:"Document Deleted Successfully"});
        }else {
          return res.json({success:false,message:"InValid Document"});
        }
    }else{
      return res.json({success:false,message:"InValid User"});
    }
  }

   
