// react hooks
import { useState, useEffect } from "react";
import "./App.css"; 
// converts text to html
import ReactMarkdown from "react-markdown";
import Footer from "./Footer";
import ShareButtons from "./components/ShareButtons";
import { FaMicrophone, FaPaperPlane, FaVolumeUp, FaLanguage } from "react-icons/fa";
import stringSimilarity from "string-similarity";

// Kannada translations for pre-trained data
const preTrainedDataKannada = {
  "ಕಾಲೇಜಿನ ಹೆಸರು": "ಸರ್ಕಾರಿ ಎಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜ್ ಹಾಸನ",
  "ಕಾಲೇಜಿನ ಸಮಯಗಳು": "ಕಾಲೇಜ್ ಸೋಮವಾರದಿಂದ ಶುಕ್ರವಾರದ ವರೆಗೆ ಬೆಳಗ್ಗೆ 9:00 ರಿಂದ ಸಂಜೆ 5:00 ರವರೆಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.",
  "ಪ್ರದಾನವಾಗುವ ಕೋರ್ಸುಗಳು": "ನಾವು ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್, ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್, ಮೆಕ್ಯಾನಿಕಲ್ ಮತ್ತು ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕೋರ್ಸ್‌ಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
  "ಕಾಲೇಜಿನ ಸ್ಥಳ": "ಕಾಲೇಜು ಹಾಸನದ ಡೈರಿ ವೃತ್ತದಲ್ಲಿ ಇದೆ.",
  "ಟಿಪಿಒ ಅಧಿಕಾರಿ": "ಡಾ. ವಸಂತಕುಮಾರ್",
  "ಸಿಎಸ್ ವಿಭಾಗದ ಮುಖ್ಯಸ್ಥೆ": "ಡಾ. ವಾಣಿ ವಿ.ಜಿ.",
  "ಸಿಎಸ್ ವಿಭಾಗದ ಉಪನ್ಯಾಸಕರು": "ಡಾ. ವಸಂತಕುಮಾರ, ಡಾ. ತೀರ್ಥೇಗೌಡ, ಡಾ. ವಾಣಿ, ಕಿರಣ್, ಶೈಲಜಾ, ಮಾನಸ, ಗೌರಿಶ್, ಮಹೇಂದ್ರ.",
  "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಸೆಲ್ ಸಂಖ್ಯೆ": "101",
  "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಸಂಯೋಜಕ": "ರಕ್ಷಿತ್ ಜಿ.ಎಮ್.",
  "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಅಧಿಕಾರಿ ಇಮೇಲ್": "cmn.vasanth@gmail.com",
  "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಕಚೇರಿ ಸಂಪರ್ಕ": "9902677199",
  "ಪ್ರಾಂಶುಪಾಲರ ಇಮೇಲ್": "principal@gechassan.ac.in",
  "ಸಿಎಸ್ 4ನೇ ವರ್ಷದ ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಖ್ಯೆ": "72",
  "ಕಾಲೇಜು ಕ್ಲಬ್": "ಕಾಂಪಾಸ್",
  "ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಕ್ಲಬ್‌ಗಳು": "ISTE, GLUE",
  "2024ರ ಸಿಎಸ್ ಕಟ್‌ಆಫ್ ರ್ಯಾಂಕ್": "20000",
  "GLUEನ ಸಿಸ್ಟಮ್ ಅಡ್ಮಿನ್": "ಅಖಿಲೇಶ್ ಮತ್ತು ಚೈತ್ರ",
  "GLUEನ ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ಹ್ಯಾಂಡ್ಲರ್": "ಶಶಾಂಕ್ ರಾಜ್",
  "GLUEನ ಡಾಕ್ಯುಮೆಂಟೇಷನ್ ಮುಖ್ಯಸ್ಥ": "ಅಯ್ಯಪ್ಪ ಮತ್ತು ಪೂಜಾ ಹೆಗ್ಡೆ",
  "GLUEನ ಪ್ರಯೋಗಾಲಯ ನಿರ್ವಾಹಕ": "ಶರಣಬಸವ ಮತ್ತು ಸ್ವಾತಿ",
  "GLUEನ ಖಜಾಂಚಿ": "ವರೂಣ್",
  "GLUEನ ಸೆಷನ್ ಹ್ಯಾಂಡ್ಲರ್": "ನಿರಂಜನ್ ಮತ್ತು ತೇಜಸ್",
  "GLUEನ ಸ್ಪೀಕರ್‌ಗಳು": "ಅರ್ಬಿಯಾ, ಮಿಥುನ್ ಕೆ.ಆರ್., ಮಿಥುನ್ ಎಲ್.ಎಂ., ಸಿಂಧು ರಾಜ್ ಮತ್ತು ಹೇಮಂತ್ ಕುಮಾರ್",
  "ಕಾಂಪಾಸ್ ಅಧ್ಯಕ್ಷರು": "ನೋಯೆಲ್ ಆಂಟನಿ ಲೋಬೋ ಮತ್ತು ಲೇಖನ ಬಿ.ಎಮ್.",
  "ಕಾಂಪಾಸ್ ಉಪಾಧ್ಯಕ್ಷರು": "ರಕ್ಷಿತ್ ಜಿ.ಎಮ್. ಮತ್ತು ಅಯ್ಯಪ್ಪ ಹುಂಸಿಂಕಟ್ಟೆ",
  "ಕಾಂಪಾಸ್ ಕಾರ್ಯದರ್ಶಿ": "ಸುರಭಿ ಜೆ.ಯು. ಮತ್ತು ಪೃಥ್ವಿ ರಾಜ್",
  "ಕಾಂಪಾಸ್ ಖಜಾಂಚಿ": "ಆದರ್ಶ್ ಮತ್ತು ಸಿಂಚನಾ ಎಸ್.ಎಸ್.",
  "ಕಾಂಪಾಸ್ ಡಾಕ್ಯುಮೆಂಟೇಷನ್": "ಓಂಕಾರ್ ಮತ್ತು ಕಾವ್ಯಾ ಹೆಚ್.ಎಮ್.",
  "ಕಾಂಪಾಸ್ ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ಹ್ಯಾಂಡ್ಲರ್": "ವೈಶ್ನವಿ ಬಿ. ಮತ್ತು ರಕ್ಷಿತಾ ಬಿ.ಎಮ್.",
  "ಕಾಂಪಾಸ್ ಘೋಷಣೆ": "ಬಿ.ಆರ್. ಆದಿತ್ಯ ಮತ್ತು ಜಾನ್ವಿ ಎಸ್.",
  "ಕಾಂಪಾಸ್ ಸೆಷನ್ ಇಂಚಾರ್ಜ್": "ಸುದೀಪ್ ಎಲ್., ಪುರಷೋತ್ತಮ್ ಹೆಚ್.ಡಿ., ಭಗ್ಯಲಕ್ಷ್ಮಿ ಆರ್.",
  "ISTE ಅಧ್ಯಕ್ಷರು": "ಶ್ರೀನಿಧಿ ಆರ್.ಎಸ್.",
  "ISTE ಉಪಾಧ್ಯಕ್ಷರು": "ದರ್ಶನ್ ಆರ್.ಬಿ.",
  "ISTE ಕಾರ್ಯದರ್ಶಿ": "ನಂದಿನಿ",
  "ISTE ಖಜಾಂಚಿ": "ಮಿಥುನ್ ಎಲ್.ಎಮ್.",
  "ISTE ಪ್ರಚಾರ ತಂಡ": "ಚೈತ್ರ ಹೆಚ್.ಎಸ್., ಹರ್ಷಿತಾ ಡಿ., ಅಖಿಲೇಶ್ ಶೆಟ್ಟಿ ಮತ್ತು ಹರ್ಷಿತಾ ಎಸ್.ಕೆ.",
  "ISTE ಸೋಶಿಯಲ್ ಮೀಡಿಯಾ ಹ್ಯಾಂಡ್ಲರ್": "ಮಿಥುನ್ ಕೆ.ಆರ್., ರಾಜಸ್ ಗೌಡ ಮತ್ತು ಶಶಾಂಕ್ ರಾಜ್",
  "ISTEನಲ್ಲಿ ಸಿಎಸ್ ವಿಭಾಗದ ಸಂಯೋಜಕರು": "ಲೆಖನ ಬಿ.ಎಮ್. ಮತ್ತು ಅಯ್ಯಪ್ಪ",
  "ISTE ಡಾಕ್ಯುಮೆಂಟೇಷನ್": "ರಕ್ಷಿತಾ ಹೆಚ್.ಜಿ. ಮತ್ತು ಅರ್ಬಿಯಾ",
  "3ನೇ ವರ್ಷದ ಸಿಆರ್ ಹೆಸರುಗಳು": "ಸಿಂಚನಾ ಎಸ್.ಎಸ್. ಮತ್ತು ಆದಿತ್ಯ",
  "4ನೇ ವರ್ಷದ ಸಿಆರ್ ಹೆಸರುಗಳು": "ಸುರಭಿ ಜೆ.ಯು. ಮತ್ತು ಅಯ್ಯಪ್ಪ",
  "4ನೇ ವರ್ಷದ ಸಿಆರ್ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ": "8310876797 ಮತ್ತು 9844019171",
  "3ನೇ ವರ್ಷದ ಸಿಆರ್ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ": "6363948867 ಮತ್ತು 6364241959",
  "2ನೇ ವರ್ಷದ ಸಿಆರ್ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ": "7090960703 ಮತ್ತು 9934821093",
  "1ನೇ ವರ್ಷದ ಸಿಆರ್ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ": "8310876797 ಮತ್ತು 8354019873"
};

// Original pre-trained data (English)
const preTrainedData = {
  "college name":"Government engineering college hassan",
  "college timings":"The college operates from 9:00 AM to 5:00 PM, Monday to Friday.",
  "courses offered": "We offer courses in Computer Science, Electronics, Mechanical, and Civil Engineering.",
  "college location of gech": "The college is located at Dairy Circle Hassan.",
  "TPO Officer":"Dr vasanthakumar",
  "Hod of Cs":"Dr Vani v g",
  "faculties of cs dept":"Dr Vasanthakumara,Dr Theerthegowda,Dr vani,Kiran,shaylaja,Manasa,Gowrish,Mahendra",
  "placement cell no":"101",
  "placement co-ordinator":"Rakshith g m",
  "placement officer email":"cmn.vasanth@gmail.com",
  "placement office contact":"9902677199",
  "principal email":"principal@gechassan.ac.in",
  "Total number of students in 4th year Cs":"72",
  "College club":"Compass",
  "Computer science clubs":"ISTE,GLUE",
  "cutoff rank for cs in 2024":"20000",
  "SYS admin of Glue":"Akhilesh and Chaitra",
  "social media handler of Glue":"shashank raj",
  "documentation head of Glue":"Ayyappa and Pooja hegde",
  "Lab incharge of Glue":"Sharanbasava and swathi",
  "Treasurer of Glue":"Varun",
  "session handler of Glue":"Niranjan and thejas",
  "Speakers of glue":"Arbiya,mithun k r,mithun l m, sindhu raj and hemanth kumar",
  "President of compass":"Noel Antony lobo and lekhana b m",
  "Vice-President of compass":"Rakshith g m abd ayyappa hunsinkatte",
  "secretary of compass":"Surabhi j u and pruthvi raj",
  "treasurer of compass":"Adarsh and sinchana ss",
  "documentation of compass":"omkar and kavya h m",
  "social media handler of compass":"vaishnavi b and rakshitha b m",
  "announcement of compass":"b r adithya and jahnvi s",
  "session incharge of compass":"Sudeep L and purushotham h d, bhagyalakshmi r",
  "President of ISTE":"Shreenidhi r s",
  "Vice-President of ISTE":"Darshan r b",
  "secretary of ISTE":"Nandini",
  "treasurer of ISTE":"Mithun l m",
  "Promotion team of ISTE":"Chaitra hs,harshitha d, akhilesh shetty and harshitha s k",
  "Social media handler of ISTE":"Mithun k r,rajas gowda and shashank raj",
  "co-ordinators of ISTE in cse":"Lekhana b m and Ayyappa",
  "Documentation of ISTE":"Rakshitha h g and Arbiya",
  "CR names of 3rd year":"Sinchana ss and Aditya",
  "CR names of 4th year":"Surabhi J u and Ayyappa",
  "4th year CR contact no":"8310876797 and 9844019171",
  "3rd year CR contact no":"6363948867 and 6364241959",
  "2nd year CR contact no":"7090960703 and 9934821093",
  "1st year CR contact no":"8310876797 and 8354019873",
};

// List of stop words to ignore to improve question matching.
const stopWords = [
  "what", "are", "the", "is", "and", "or", "in", "of", "to", "from", "how", "can", "i", "you", "at", "your"
];

// Function to normalize text (remove spaces, punctuation, stop words, and make lowercase)
// The normalizeText function takes two inputs:
// text: A string to be processed (like a question or a sentence).
// isKannada: A boolean value indicating whether the text is in Kannada (true) or English (false).
const normalizeText = (text, isKannada) => {
  // Use different normalization rules based on language
  if (isKannada) {
    // Kannada normalization rules
    return text
      .toLowerCase()
      .replace(/[^ಅ-ಹ0-9\s]/g, "") // Remove non-Kannada characters
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim();
  } else {
    // English normalization rules
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove punctuation
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim()
      .split(" ") // Split into words
      .filter((word) => !stopWords.includes(word)) // Remove stop words
      .join(" "); // Rejoin filtered words into a string
  }
};

// Main application component managing states, user interactions, and rendering the UI.
function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isKannada, setIsKannada] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new webkitSpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = isKannada ? "kn-IN" : "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech recognition is not supported in this browser.");
    }
  }, [isKannada]);

  // Toggles the speech recognition feature on or off.
  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
        setIsListening(true);
      }
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };
//  Converts text to speech using speechSynthesis and toggles the speaking state.
  const toggleSpeaking = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isKannada ? "kn-IN" : "en-US";
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Switches between Kannada and English modes, resetting the chat history.
  const toggleLanguage = () => {
    setIsKannada(!isKannada);
    setChatHistory([]);
  };

  // Processes the user's question, finds the best matching answer from predefined data using fuzzy matching, and updates the chat history.
  const generateAnswer = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const normalizedQuestion = normalizeText(question, isKannada);
    const currentPreTrainedData = isKannada ? preTrainedDataKannada : preTrainedData;
    const preTrainedKeys = Object.keys(currentPreTrainedData).map(key => normalizeText(key, isKannada));

    // stringSimilarity.findBestMatch is a utility function from the string-similarity library.
    // Find the best match using fuzzy matching
    const matches = stringSimilarity.findBestMatch(
      normalizedQuestion,
      preTrainedKeys
    );

    const bestMatchIndex = matches.bestMatchIndex;
    const bestMatchScore = matches.bestMatch.rating;
    const matchThreshold = 0.6; // Minimum similarity threshold

    const response =
      bestMatchScore >= matchThreshold
        ? currentPreTrainedData[Object.keys(currentPreTrainedData)[bestMatchIndex]]
        : "I don't have access to this question.";

    setChatHistory((prevChat) => [
      ...prevChat,
      { type: "question", text: question },
      { type: "answer", text: response },
    ]);
    setQuestion("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="flex justify-between items-center px-6 pt-6">
        <h1 className="text-5xl font-bold text-blue-400 mb-2">
          {isKannada ? "ಕಾಲೇಜ್ ಮೇಟ್ AI" : "CollegeMate AI"}
        </h1>
        <button 
          onClick={toggleLanguage} 
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
        >
          <FaLanguage className="text-white" />
        </button>
      </div>
      <p className="text-md text-gray-400 text-center mb-10">
        {isKannada ? "ನಿಮ್ಮ ಕೈಯ ಕಲಾಪಗಳಿಗಾಗಿ ನಿಮ್ಮ ಕಾಲೇಜ್ ಸಹಾಯಕ" : "Your college assistant at your fingertips"}
      </p>
      <div className="flex-grow p-6 overflow-auto">
        <div className="chat-box max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-4 mt-10">
          <p className="text-lg text-gray-400 text-left">
            {isKannada ? "ಏನು ಸಹಾಯ ಮಾಡಬಹುದು?" : "How may I help you?"}
          </p>
          <div className="chat-display space-y-4 mb-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  chat.type === "question"
                    ? "bg-blue-500 text-white self-end text-right w-fit max-w-[80%] ml-auto"
                    : "bg-gray-700 text-white self-start text-left w-fit max-w-[80%] ml-4 overflow-x-scroll"
                }`}
              >
                <ReactMarkdown>{chat.text}</ReactMarkdown>
                {chat.type === "answer" && (
                  <div className="flex justify-end mt-2 space-x-2">
                    <button
                      onClick={() => toggleSpeaking(chat.text)}
                      className="flex items-center text-white mt-2 mr-2"
                    >
                      <FaVolumeUp className="mr-1" />
                      {isKannada ? "ಮಾತನಾಡಿ" : "Speak"}
                    </button>
                    <ShareButtons answer={chat.text} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={generateAnswer}
            className="flex items-center w-full bg-gray-800 p-3 rounded-lg shadow-md"
          >
            <textarea
              required
              className="border border-gray-700 bg-gray-800 text-white rounded-lg w-full p-2 h-12 resize-none focus:border-blue-500 outline-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={isKannada ? "ನಿಮ್ಮ ಕಾಲೇಜ್ ಸಹಾಯಕನನ್ನು ಕೇಳಿ..." : "Ask your college assistant..."}
            />
            <div className="flex items-center space-x-2 ml-4">
              {recognition && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-transform duration-300 ease-in-out ${
                    isListening ? "bg-red-500 flicker" : "bg-blue-500"
                  } hover:opacity-80`}
                >
                  <FaMicrophone className="text-white" />
                </button>
              )}
              <button
                type="submit"
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <FaPaperPlane className="text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;