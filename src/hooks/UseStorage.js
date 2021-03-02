import { useState, useEffect } from 'react'
import {projectStorage, projectFirestore, timestamp} from '../firebase/config'



const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() =>{
        //references

        const storageRef = projectStorage.ref(file.name)
        const collectionRef = projectFirestore.collection('images')
        
        /* This gets the filename and adds it to 
          the firebase projectStorage reference,
          then saving them to the storageRef variable   */


        storageRef.put(file /*inserts the file into projectStorage*/ ).on('state_changed', 
        /* This adds the file to the StorageRef,
         it takes three functions as parameters(known in javascript as Callbacks) */
         (snap)=>{
            let  percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
            /* This gets the percentage of the file transfered
             and stores in the progress state */

        }, (err) =>{
            setError(err)
            /* This is fired if there are errors */
        }, async () => {
            const createdAt = timestamp()
            const url = await storageRef.getDownloadURL()
            collectionRef.add({url, createdAt})
            setUrl(url)
            /* This is only fired when there are no errors.
            When the percentage is complete.
            It takes the storageRef, which is the file name,
            gets the downloadUrl,
            and adds it along with the file to the url */
        })

    }, [file] /*The useEffect fires when it sees a file */ )

    return {progress,  url, error}
    // This returns all the parameters

}

export default useStorage
