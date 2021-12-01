export function getProfilePicture( trainerId ) {
    trainerId = ( trainerId % 20 ) + 1;
    return "/profilePics/profilePic" + trainerId + ".jpg";
}