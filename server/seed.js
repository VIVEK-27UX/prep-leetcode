const mongoose = require('mongoose');
const dns = require('dns');
const Question = require('./models/Question');
require('dotenv').config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const freshPool = [
  // ARRAYS
  { title: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/", difficulty: "Easy", level: 0, nextRevision: new Date() },
  { title: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", level: 0, nextRevision: new Date() },
  { title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", level: 0, nextRevision: new Date() },
  
  // STRINGS
  { title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy", level: 0, nextRevision: new Date() },
  { title: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", level: 0, nextRevision: new Date() },
  
  // LINKED LISTS
  { title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", level: 0, nextRevision: new Date() },
  { title: "Merge K Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", level: 0, nextRevision: new Date() },
  
  // TREES
  { title: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "Easy", level: 0, nextRevision: new Date() },
  { title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy", level: 0, nextRevision: new Date() },
  { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium", level: 0, nextRevision: new Date() }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB... 🚀");
    
    // This removes questions you haven't started yet (level 0) 
    // to avoid duplicates, but keeps your progress on solved ones!
    await Question.deleteMany({ level: 0 }); 
    
    await Question.insertMany(freshPool);
    console.log(`Successfully added ${freshPool.length} new challenges to the pool!`);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });