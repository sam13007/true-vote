pragma solidity >=0.4.24 <0.6.0;

contract Voting {

    event AddedCandidate(uint candidateID);
    
    address owner;
    
    constructor() public {
        
        owner=msg.sender;
        
    }
    
        modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
   
    struct Candidate {
		
        bytes32 name;
        bytes32 party; 
		string img;
         uint voteCount;
        bool doesExist; 
    }

    struct File{
		string file;
		string desc;
		address acc;
	}
	
	uint numFiles;
    uint numCandidates; 
    uint numVoters;

    
	mapping(uint => File) files;
	
    mapping (uint => Candidate) candidates;
    
    mapping(address => bool) voteAdd;
	
	function toString(address x) public returns (string memory)  {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

	function addFile(string memory file,string memory desc) public {
		uint fileID = numFiles++;
		files[fileID] = File(file,desc,msg.sender);
		
	}
	
    function addCandidate(bytes32 name, bytes32 party,string memory img) onlyOwner public {
      
        uint candidateID = numCandidates++;
      
        candidates[candidateID] = Candidate(name,party,img,0,true);
        
        emit AddedCandidate(candidateID);
    }

    function vote(uint candidateID) public {
        require(!voteAdd[msg.sender]);
        if (candidates[candidateID].doesExist == true) {
             
			voteAdd[msg.sender] = true;
            candidates[candidateID].voteCount++;
        }
    }
	
 	
    

	function getWinner() public view returns(bytes32, bytes32,string memory,uint){
	 	Candidate memory max;
		for(uint i=0;i<numCandidates;i++){
			if(candidates[i].voteCount>max.voteCount){
				max=candidates[i];
			}
		}
		return(max.name,max.party,max.img,max.voteCount);
		
	}
   
   
    function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }
	
	function getNumOfFiles() public view returns(uint){
		return numFiles;
	}
    
    // returns candidate information, including its ID, name, and party
    
    
    function getCandidate(uint candidateID) public view returns (uint,bytes32, bytes32,string memory,uint) {
        return (candidateID,candidates[candidateID].name,candidates[candidateID].party,candidates[candidateID].img,candidates[candidateID].voteCount);
    }
	
	function getFile(uint FileID) public view returns (uint,string memory,string memory,address){
		
			return (FileID,files[FileID].file,files[FileID].desc,files[FileID].acc);
		
		
		
		
	}
	function getOwner() public view returns(address){
	 	return owner;
	}
	
	function hasVoted(address account) public view returns (bool){
		return (voteAdd[account]);
	}
}
