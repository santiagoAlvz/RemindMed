// App.js file 
//import { API_KEY } from '@env';
import { StatusBar } from "expo-status-bar"; 
import { useState, useContext } from "react"; 
import { router } from 'expo-router';
import { 
	Button, 
	StyleSheet, 
	Text, 
	Image, 
	SafeAreaView, 
    FlatList,
    View,
    TextInput
} from "react-native"; 
import * as ImagePicker from "expo-image-picker"; 
import PendingMedicinesContext from '@/contexts/pendingMedicines';
import { Medicine } from "@/constants/Models";
interface Medication {
    fullText: string;
}

const medicationNames = [
    'Amoxicillin',   // + Clavulanic acid
    'Paracetamol',
    // Add more medication names here if needed
];

// Helper function to clean and split the input string into words
const cleanAndSplitInput = (input: string): string[] => {
    return input.split(/\s+/).filter(word => word.trim() !== '');
  };
  
const collectWordsFromMultipleStarts = (input: string, startWords: string[]): Medication[] => {
    const words = cleanAndSplitInput(input);
    const result: Medication[] = [];
    let currentList: string[] = [];
    let collecting = false;
  
    for (const word of words) {
      if (startWords.includes(word)) {
        if (collecting && currentList.length > 0) {
          result.push({ fullText: currentList.join(' ') });
        }
        currentList = [word]; // Start the new list with the start word
        collecting = true;
        continue; // Continue to add the next words
      }
      if (collecting) {
        currentList.push(word);
      }
    }
  
    // If the string ends and we are still collecting, add the remaining words
    if (collecting && currentList.length > 0) {
      result.push({ fullText: currentList.join(' ') });
    }
  
    return result;
  };
  

// Example usage:
const inputTest = `Name of Patient
Address
Room
Amoxicillin + Clavulanic acid
(Co-Amoxiclav)
500/125 mg/tab
Sig. Take one with food
every 8 hours for 7 days
Paracetamol
500 mg/tab
Sig. Take one with food
#21
#5
every 4 hours as needed
for fever (temp. ≥ 37.8°C)
Mitha
Mark Lawren
No. 120000000000`;

export default function Cam() { 

	// State to hold the selected image 
	const [image, setImage] = useState(null); 
	
	// State to hold extracted text 
	const [extractedText, setExtractedText] = 
		useState(""); 

    const [inputText, setInputText] = useState('');
    const [medications, setMedications] = useState<Medication[]>([]);
    const { pendingMedicines, setPendingMedicines } = useContext(PendingMedicinesContext);

	// Function to pick an image from the 
	// device's gallery 
	const pickImageGallery = async () => { 
		let result = 
			await ImagePicker.launchImageLibraryAsync({ 
				mediaTypes: 
					ImagePicker.MediaTypeOptions.Images, 
				allowsEditing: true, 
				base64: true, 
				allowsMultipleSelection: false, 
			}); 
		if (!result.canceled) { 
		
			// Perform OCR on the selected image 
			performOCR(result.assets[0]); 
			
			// Set the selected image in state 
			setImage(result.assets[0].uri); 
		} 
	}; 

	// Function to capture an image using the 
	// device's camera 
	const pickImageCamera = async () => { 
		let result = await ImagePicker.launchCameraAsync({ 
			mediaTypes: ImagePicker.MediaTypeOptions.Images, 
			allowsEditing: true, 
			base64: true, 
			allowsMultipleSelection: false, 
		}); 
		if (!result.canceled) { 
		
			// Perform OCR on the captured image 
			// Set the captured image in state 
			performOCR(result.assets[0]); 
			setImage(result.assets[0].uri); 
		} 
	}; 

	// Function to perform OCR on an image 
	// and extract text 
	const performOCR = (file) => { 
		let myHeaders = new Headers(); 
		myHeaders.append( 
			"apikey", 
			
			// ADDD YOUR API KEY HERE 
			API_KEY
		); 
		myHeaders.append( 
			"Content-Type", 
			"multipart/form-data"
		); 

		let raw = file; 
		let requestOptions = { 
			method: "POST", 
			redirect: "follow", 
			headers: myHeaders, 
			body: raw, 
		}; 

		// Send a POST request to the OCR API 
		fetch( 
			"https://api.apilayer.com/image_to_text/upload", 
			requestOptions 
		) 
			.then((response) => response.json()) 
			.then((result) => { 
			
				// Set the extracted text in state 
				setExtractedText(result["all_text"]); 
			}) 
			.catch((error) => console.log("error", error)); 
	}; 


      const handleClick = () => {
        const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        const collectedMedications = collectWordsFromMultipleStarts(extractedText, medicationNames);
        setMedications(collectedMedications);
        collectedMedications.length
        let pendingMedicines : Medicine[] = [];
        for (let i = 0; i < collectedMedications.length; i++) {
           
            let wordsCap = collectedMedications[i].fullText.split(' ');

            let med = '';
            if (wordsCap.length > 0) {
                med = wordsCap[0];
                if (wordsCap.length > 1 && wordsCap[1] === '+') {
                    med += ' ' + wordsCap[1] + ' ' + wordsCap[2];
                }
            }

            console.log(med);

            let words = collectedMedications[i].fullText.toLowerCase().split(' ');
			var hours, dose;
			
            var temp = words[words.indexOf('hours') - 1]
			if(temp === "&"){
				 temp = "8"
			}
            if(isNaN(parseInt(temp))){
            	hours = numbers.indexOf(temp);
            } else {
				hours = parseInt(temp);
			}

            temp = words[words.indexOf('take') + 1]

            if(isNaN(parseInt(temp))){
            	dose = numbers.indexOf(temp);
            } else {
				dose = parseInt(temp);
			}
            let jsonMed : Medicine = {"name": med, "enabled": true,"interval": hours,"dose": dose,"schedule": []};
            pendingMedicines.push(jsonMed);
          }
          console.log(pendingMedicines)
          setPendingMedicines(pendingMedicines);
		  router.replace('/review');
          
          
        //console.log(collectedMedications.length)
      };

	return ( 
		<SafeAreaView style={styles.container}> 
			<Text style={styles.heading2}> 
				Upload your prescription 
			</Text> 
			<Button 
				title="Pick an image from gallery"
				onPress={pickImageGallery} 
			/> 
			<Button 
				title="Take an image from camera"
				onPress={pickImageCamera} 
			/> 
			{image && ( 
				<Image 
					source={{ uri: image }} 
					style={{ 
						width: 400, 
						height: 300, 
						objectFit: "contain", 
					}} 
				/> 
			)} 

			<Text style={styles.text1}> 
				Extracted text: 
			</Text> 
			<Text style={styles.text1}> 
				{extractedText} 
			</Text> 
            <Button title="Accept " onPress={handleClick} />
            <FlatList
                data={medications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.medicationContainer}>
                    <Text style={styles.medicationText}>{item.fullText}</Text>
                </View>
                )}
            />
			<StatusBar style="auto" /> 
		</SafeAreaView> 
	); 
} 

const styles = StyleSheet.create({ 
	container: { 
		display: "flex", 
		alignContent: "center", 
		alignItems: "center", 
		justifyContent: "space-evenly", 
		backgroundColor: "#fff", 
		height: "100%", 
	}, 
	heading: { 
		fontSize: 28, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "green", 
		textAlign: "center", 
	}, 
	heading2: { 
		fontSize: 22, 
		fontWeight: "bold", 
		marginBottom: 10, 
		color: "black", 
		textAlign: "center", 
	}, 
	text1: { 
		fontSize: 16, 
		marginBottom: 10, 
		color: "black", 
		fontWeight: "bold", 
	}, 
});