import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';


export class ImageService {
    uploadImage(image, public_id = ""): Promise<string> {
      try {
        if (!image) throw new ForbiddenException("Credential Incorrect!");
        // const allowedExtensions = [".png", ".jpg", ".gif", ".jpeg"];
        // const fileExtension =
        //   "." + image.originalname.split(".").pop().toLowerCase();
  
        // if (!allowedExtensions.includes(fileExtension)) {
        //   throw new BadRequestException(
        //     "Invalid file extension. Only .png, .jpg, .gif, and .jpeg are allowed."
        //   );
        // }
        return new Promise((resolve, reject) => {
          v2.uploader
            .upload_stream(
              { folder: "Estate App", public_id: public_id },
              (error, result) => {
                if (result) {
                  resolve(result.secure_url);
                } else {
                  reject(error);
                }
              }
            )
            .end(
              typeof image == "string"
                ? Buffer.from(image, "base64")
                : image.buffer
            );
        });
      } catch (error) {
        throw error;
      }
    }
  
    // async uploadResume(
    //   resumeFile: Express.Multer.File,
    //   public_id = ""
    // ): Promise<string> {
    //   try {
    //     return new Promise(async (resolve, reject) => {
    //       console.log("into here");
    //       v2.uploader
    //         .upload_stream(
    //           { folder: "JobPortal", public_id: public_id },
    //           (error, result) => {
    //             if (error) {
    //               console.log("error12", error);
    //               reject(new Error("Error uploading resume"));
    //             } else {
    //               resolve(result.secure_url);
    //             }
    //           }
    //         )
    //         .end(resumeFile.buffer);
    //     });
    //   } catch (error) {
    //     console.log("error", error.message);
    //     throw error;
    //   }
    // }
  
    getImage(public_id: string) {
      return v2.image(public_id);
    }
  }