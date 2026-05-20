import { useState, useMemo, useCallback, useEffect } from "react";


const C = {bg:"#07090F",surf:"#0C1019",surf2:"#111827",bord:"#1A2535",text:"#E4EDF8",muted:"#5C7187",accent:"#F59E0B",indigo:"#818CF8",green:"#22C55E",red:"#FF5A5F"};
const DC = {Achievement:"#F59E0B",Impact:"#10B981",Curiosity:"#818CF8",Autonomy:"#F472B6",Recognition:"#FB923C",Learning:"#2DD4BF"};
const CC = {Analytical:"#38BDF8",Structured:"#A78BFA",Intuitive:"#FCD34D",Creative:"#F9A8D4"};
const AC = {"Co-founder Ready":"#22C55E",Exploring:"#F59E0B","Part-Time":"#64748B"};
const RI = {Visionary:"◆",Executor:"▲",Analyst:"●",Generalist:"★"};
const ACCESS = "deeptech";
const SHEET_CSV = "https://docs.google.com/spreadsheets/d/1H-XrvVG-k5dpETxh29-BCpMI1geTyA4SBFIUNwE785w/pub?output=csv";
const FORM_URL = "https://forms.gle/4fJKu397jhKGoeT4A";

const P = [
  {id:1,name:"Maksims Jurinovs",drives:["Impact"],cog:"Intuitive",act:3,risk:3,learn:4,mission:"Other / custom",vals:"Impact",role:"Executor",dom:["Chemistry / Chemical Engineering","Nanotechnology"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:2,name:"Sergejs Gaidukovs",drives:["Curiosity"],cog:"Structured",act:3,risk:2,learn:4,mission:"Education & learning",vals:"Quality",role:"Visionary",dom:["Physics / Materials Science","Chemistry / Chemical Engineering","Nanotechnology","Environmental Science / Sustainability","Cybersecurity","Robotics / Mechatronics"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Operations / Scaling Processes","Communication & Storytelling","Pitching / Public Speaking"],exp:false,avail:"Co-founder Ready",commit:"Part-time",contact:""},
  {id:3,name:"Arita Dubnika",drives:["Impact"],cog:"Analytical",act:4,risk:3,learn:5,mission:"Healthcare innovation / equity",vals:"Impact",role:"Visionary",dom:["Physics / Materials Science","Biology / Biotech / Life Sciences","Medical Devices","Diagnostics / Imaging","Clinical Research / Trials","Healthcare Systems / Policy"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Communication & Storytelling"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:4,name:"Dagnija Loca",drives:["Curiosity"],cog:"Analytical",act:4,risk:3,learn:4,mission:"Healthcare innovation / equity",vals:"Quality",role:"Visionary",dom:["Physics / Materials Science","Chemistry / Chemical Engineering","Medical Devices"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Grant Writing / Public Funding","Team Leadership / Management","Recruitment / Talent Development","Project Management","Communication & Storytelling"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:5,name:"Linda Broka",drives:["Impact"],cog:"Structured",act:4,risk:4,learn:5,mission:"Climate & sustainability",vals:"Quality",role:"Visionary",dom:["Business Strategy / Commercialization","Marketing"],skills:["UX/UI Design","Business Strategy","Go-to-Market Planning","Sales / Business Development","Team Leadership / Management","Project Management","Communication & Storytelling","Pitching / Public Speaking","B2B Sales","B2C Sales"],exp:true,avail:"Co-founder Ready",commit:"Part-time",contact:""},
  {id:6,name:"Behnam Boobani",drives:["Achievement"],cog:"Structured",act:3,risk:4,learn:4,mission:"Healthcare innovation / equity",vals:"Integrity",role:"Generalist",dom:["Clinical Research / Trials","Healthcare Systems / Policy"],skills:["R&D / Laboratory Research"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:7,name:"Oskars Bērziņš",drives:["Achievement"],cog:"Analytical",act:3,risk:2,learn:4,mission:"Digitisation in construction",vals:"Quality",role:"Generalist",dom:["Business Strategy / Commercialization","Product Management","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Project Management","B2B Sales"],exp:false,avail:"Exploring",commit:"Full-time",contact:""},
  {id:8,name:"Dace Stradina - Ungure",drives:["Achievement"],cog:"Intuitive",act:5,risk:4,learn:4,mission:"Healthcare innovation / equity",vals:"Quality",role:"Executor",dom:["Business Strategy / Commercialization","Product Management","Sales"],skills:["Sales / Business Development","Product Management","Team Leadership / Management","Project Management","Communication & Storytelling","B2B Sales"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:9,name:"Iev Sijāte",drives:["Curiosity"],cog:"Creative",act:4,risk:4,learn:5,mission:"Education & learning",vals:"Integrity",role:"Generalist",dom:["Neuroscience / Cognitive Science"],skills:["Team Leadership / Management","Recruitment / Talent Development","Project Management","Communication & Storytelling","Pitching / Public Speaking","Negotiation & Partnerships","B2B Sales"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:10,name:"Kristaps Pete",drives:["Achievement"],cog:"Analytical",act:2,risk:2,learn:2,mission:"Timber process and manufacturing",vals:"Quality",role:"Executor",dom:["Physics / Materials Science","Mechanical / Industrial Engineering","Sales"],skills:["R&D / Laboratory Research","Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Team Leadership / Management","Operations / Scaling Processes","Negotiation & Partnerships"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:""},
  {id:11,name:"Klavs Kokins",drives:["Impact"],cog:"Analytical",act:3,risk:3,learn:3,mission:"Industrial transformation",vals:"Integrity",role:"Generalist",dom:["Electrical Engineering","Product Management"],skills:["Prototyping / Engineering Design","Product Management","Grant Writing / Public Funding","Team Leadership / Management","Project Management"],exp:true,avail:"Part-Time",commit:"Part-time",contact:""},
  {id:12,name:"Rihards Ruska",drives:["Achievement"],cog:"Structured",act:4,risk:5,learn:5,mission:"Deep science translation",vals:"Integrity",role:"Generalist",dom:["Physics / Materials Science","Chemistry / Chemical Engineering","Nanotechnology","Product Management","Venture Building / Fundraising","Marketing","Sales"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Go-to-Market Planning","Sales / Business Development","Product Management","Team Leadership / Management","Recruitment / Talent Development","Operations / Scaling Processes","Communication & Storytelling","Pitching / Public Speaking","B2B Sales","B2C Sales"],exp:true,avail:"Exploring",commit:"Part-time",contact:""},
  {id:13,name:"Sabīne Veide",drives:["Curiosity"],cog:"Analytical",act:3,risk:4,learn:5,mission:"Financial inclusion",vals:"Quality",role:"Analyst",dom:["Business Strategy / Commercialization","Regulatory / Compliance"],skills:["Business Strategy","Market Research / Customer Discovery","Financial Modeling / Unit Economics","Team Leadership / Management","Project Management","Communication & Storytelling","Legal / IP Strategy","Negotiation & Partnerships"],exp:true,avail:"Co-founder Ready",commit:"Full-time",contact:""},
  {id:14,name:"Olita Mestere",drives:["Curiosity"],cog:"Analytical",act:3,risk:2,learn:2,mission:"Healthcare innovation / equity",vals:"Learning",role:"Executor",dom:["Biology / Biotech / Life Sciences","Product Management","Sales"],skills:["Go-to-Market Planning","Sales / Business Development","Product Management","Project Management","B2B Sales"],exp:false,avail:"Part-Time",commit:"Part-time",contact:""},
  {id:15,name:"Ralfs Buks",drives:["Curiosity"],cog:"Analytical",act:2,risk:3,learn:3,mission:"Deep science translation",vals:"Quality",role:"Analyst",dom:["Biology / Biotech / Life Sciences","Diagnostics / Imaging"],skills:["R&D / Laboratory Research","Grant Writing / Public Funding","Project Management"],exp:true,avail:"Exploring",commit:"Part-time",contact:""},
  {id:16,name:"Voldemārs Brēdiķis",drives:["Achievement","Impact"],cog:"Structured",act:4,risk:3,learn:3,mission:"Healthcare innovation / equity",vals:"Impact",role:"Generalist",dom:["Environmental Science / Sustainability","Business Strategy / Commercialization","Product Management","Venture Building / Fundraising","Marketing","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Fundraising / Investor Relations","Team Leadership / Management","Recruitment / Talent Development","Operations / Scaling Processes","Pitching / Public Speaking","Negotiation & Partnerships","B2B Sales"],exp:true,avail:"Part-Time",commit:"Part-time",contact:""},
  {id:17,name:"Oļegs Smirnovs",drives:["Impact"],cog:"Creative",act:4,risk:5,learn:5,mission:"Creating innovative and impactful solutions",vals:"Speed",role:"Visionary",dom:["Business Strategy / Commercialization","Product Management","Marketing","Sales"],skills:["Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Product Management","Communication & Storytelling","Negotiation & Partnerships","B2B Sales"],exp:true,avail:"Part-Time",commit:"Equity-only",contact:""},
  {id:18,name:"Karīna Harkina",drives:["Achievement"],cog:"Structured",act:3,risk:2,learn:3,mission:"Education & learning",vals:"Quality",role:"Analyst",dom:["Business Strategy / Commercialization","Product Management","Marketing"],skills:["Business Strategy","Market Research / Customer Discovery","Product Management","Financial Modeling / Unit Economics","Team Leadership / Management","Project Management"],exp:false,avail:"Part-Time",commit:"Part-time",contact:""},
  {id:19,name:"Aleksejs Peņkovs",drives:["Achievement","Impact"],cog:"Structured",act:2,risk:2,learn:4,mission:"Education & learning",vals:"Quality",role:"Generalist",dom:["Mechanical / Industrial Engineering","Software Engineering","Data Science / Analytics"],skills:["Team Leadership / Management","Project Management","Communication & Storytelling","Negotiation & Partnerships"],exp:false,avail:"Part-Time",commit:"Part-time",contact:""},
  {id:20,name:"Kaspars Virbulis",drives:["Curiosity"],cog:"Analytical",act:3,risk:3,learn:5,mission:"Education & learning",vals:"Learning",role:"Visionary",dom:["Robotics / Mechatronics","Business Strategy / Commercialization","Product Management","Regulatory / Compliance"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Regulatory / Compliance","Quality Assurance / Testing","Go-to-Market Planning","Product Management","Project Management","B2B Sales"],exp:true,avail:"Part-Time",commit:"Part-time",contact:""},
  {id:21,name:"Liga Zvejniece",drives:["Impact"],cog:"Structured",act:3,risk:3,learn:4,mission:"Healthcare innovation / equity",vals:"Learning",role:"Executor",dom:["Biology / Biotech / Life Sciences","Neuroscience / Cognitive Science"],skills:["R&D / Laboratory Research"],exp:false,avail:"Exploring",commit:"Equity-only",contact:""},
  {id:22,name:"Katrīna Jurkevica",drives:["Achievement"],cog:"Structured",act:3,risk:2,learn:4,mission:"Climate & sustainability",vals:"Impact",role:"Visionary",dom:["Business Strategy / Commercialization","Product Management","Marketing"],skills:["Team Leadership / Management","Recruitment / Talent Development","Project Management","Operations / Scaling Processes","Communication & Storytelling","Pitching / Public Speaking","Negotiation & Partnerships","B2B Sales","B2C Sales"],exp:false,avail:"Exploring",commit:"Part-time",contact:""},
  {id:23,name:"Artūrs Ņikuļins",drives:["Curiosity"],cog:"Analytical",act:4,risk:3,learn:3,mission:"AI for good / ethical tech",vals:"Impact",role:"Analyst",dom:["Artificial Intelligence / Machine Learning","Data Science / Analytics"],skills:["Data Science / Machine Learning","R&D / Laboratory Research"],exp:true,avail:"Exploring",commit:"Equity-only",contact:""},
  {id:24,name:"Janis Selis",drives:["Achievement"],cog:"Intuitive",act:3,risk:4,learn:4,mission:"Digital inclusion / access",vals:"Quality",role:"Visionary",dom:["Marketing"],skills:["Project Management","Communication & Storytelling","Negotiation & Partnerships"],exp:false,avail:"Exploring",commit:"Equity-only",contact:""},
  {id:25,name:"Jekaterina Šime",drives:["Achievement","Recognition"],cog:"Analytical",act:2,risk:4,learn:5,mission:"Education & learning",vals:"Quality",role:"Generalist",dom:["Business Strategy / Commercialization","Venture Building / Fundraising","Marketing","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Fundraising / Investor Relations","Team Leadership / Management","Recruitment / Talent Development","Project Management","Operations / Scaling Processes","Communication & Storytelling","Pitching / Public Speaking","Negotiation & Partnerships","B2B Sales","B2C Sales"],exp:true,avail:"Exploring",commit:"Part-time",contact:"linkedin.com/in/jekaterinasime/"},
  {id:26,name:"Ance Gailuma",drives:["Achievement","Impact"],cog:"Structured",act:3,risk:4,learn:4,mission:"Healthcare innovation / equity",vals:"Quality",role:"Visionary",dom:["Business Strategy / Commercialization","Product Management","Venture Building / Fundraising","Regulatory / Compliance","Marketing","Sales"],skills:["Market Research / Customer Discovery","Go-to-Market Planning","Product Management","Fundraising / Investor Relations","Team Leadership / Management","Project Management","Communication & Storytelling","Negotiation & Partnerships","B2C Sales"],exp:true,avail:"Co-founder Ready",commit:"Full-time",contact:"ance.gailuma@gmail.com"},
  {id:27,name:"Marija Lazovska",drives:["Curiosity"],cog:"Analytical",act:3,risk:2,learn:3,mission:"Deep science translation",vals:"Learning",role:"Visionary",dom:["Biology / Biotech / Life Sciences","Bioinformatics / Computational Biology"],skills:["R&D / Laboratory Research"],exp:false,avail:"Part-Time",commit:"Part-time",contact:"marija.lazovska@rsu.lv"},
  {id:28,name:"Jurijs Zubovs",drives:["Achievement","Autonomy"],cog:"Analytical",act:2,risk:3,learn:4,mission:"Climate & sustainability",vals:"Integrity",role:"Analyst",dom:["Artificial Intelligence / Machine Learning","Product Management","Marketing","Sales"],skills:["Market Research / Customer Discovery","Sales / Business Development","Product Management","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Communication & Storytelling","Negotiation & Partnerships"],exp:true,avail:"Exploring",commit:"Part-time",contact:"plasma.novelsolutions@gmail.com"},
  {id:29,name:"Edgars Alberts",drives:["Autonomy","Curiosity"],cog:"Structured",act:1,risk:4,learn:3,mission:"Digital inclusion / access",vals:"Quality",role:"Executor",dom:["Software Engineering"],skills:["Software Development","Systems Architecture"],exp:true,avail:"Part-Time",commit:"Part-time",contact:"edgars.alberts@gmail.com"},
  {id:30,name:"Kristīne Šalma-Ancāne",drives:["Achievement"],cog:"Structured",act:3,risk:2,learn:3,mission:"Healthcare innovation / equity",vals:"Impact",role:"Visionary",dom:["Chemistry / Chemical Engineering","Biology / Biotech / Life Sciences","Nanotechnology"],skills:["R&D / Laboratory Research","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Communication & Storytelling"],exp:false,avail:"Exploring",commit:"Part-time",contact:"kristine.salma-ancabe@rtu.lv"},
  {id:31,name:"Elza Cirule",drives:["Achievement","Impact"],cog:"Intuitive",act:3,risk:4,learn:4,mission:"Climate & sustainability",vals:"Integrity",role:"Visionary",dom:["Marketing","Sales"],skills:["Fundraising / Investor Relations","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Communication & Storytelling","Pitching / Public Speaking"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:"Info@elaworks.lv"},
  {id:32,name:"Dāvis Mosāns",drives:["Impact","Curiosity"],cog:"Analytical",act:3,risk:4,learn:4,mission:"Digital inclusion / access",vals:"Quality",role:"Executor",dom:["Artificial Intelligence / Machine Learning","Software Engineering","Cybersecurity","Blockchain / Cryptography"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Software Development","Systems Architecture","Hardware Integration"],exp:false,avail:"Exploring",commit:"Equity-only",contact:"Davis@Atradu.AI"},
  {id:33,name:"Eva Luksa",drives:["Achievement","Impact"],cog:"Creative",act:4,risk:5,learn:5,mission:"Education & learning",vals:"Impact",role:"Visionary",dom:["Product Management","Marketing"],skills:["UX/UI Design","Product Management","Team Leadership / Management","Project Management","Communication & Storytelling","Marketing"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:"Luksa.Eva@gmail.com"},
  {id:34,name:"Ralfs Minkevics",drives:["Achievement","Impact"],cog:"Analytical",act:3,risk:4,learn:5,mission:"Industrial transformation",vals:"Integrity",role:"Visionary",dom:["Environmental Science / Sustainability","Business Strategy / Commercialization","Product Management","Marketing","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Product Management","Team Leadership / Management","Project Management","Operations / Scaling Processes","Pitching / Public Speaking","B2B Sales","B2C Sales"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:"ralfs.minkevics@gmil.com"},
  {id:35,name:"Reinis Leveika",drives:["Achievement"],cog:"Analytical",act:3,risk:3,learn:5,mission:"Industrial transformation",vals:"Impact",role:"Executor",dom:["Electrical Engineering","Mechanical / Industrial Engineering","Business Strategy / Commercialization","Product Management","Sales"],skills:["Business Strategy","Sales / Business Development","Product Management","Financial Modeling / Unit Economics","Team Leadership / Management","Project Management","Operations / Scaling Processes","Negotiation & Partnerships"],exp:true,avail:"Exploring",commit:"Part-time",contact:"reinis.l@gmail.com"},
  {id:36,name:"Harshul Gupta",drives:["Achievement","Autonomy","Impact","Curiosity"],cog:"Analytical",act:4,risk:4,learn:5,mission:"Industrial transformation",vals:"Learning",role:"Visionary",dom:["Environmental Science / Sustainability","Artificial Intelligence / Machine Learning","Blockchain / Cryptography","Business Strategy / Commercialization","Venture Building / Fundraising","Marketing","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Fundraising / Investor Relations","Financial Modeling / Unit Economics","Team Leadership / Management","Operations / Scaling Processes","Communication & Storytelling","Pitching / Public Speaking","Negotiation & Partnerships","B2B Sales","B2C Sales"],exp:false,avail:"Exploring",commit:"Full-time",contact:"+371 22418039"},
  {id:37,name:"Undīne Ēvalde",drives:["Achievement","Curiosity"],cog:"Analytical",act:3,risk:4,learn:5,mission:"Industrial transformation",vals:"Impact",role:"Executor",dom:["Physics / Materials Science","Nanotechnology"],skills:["Grant Writing / Public Funding","Team Leadership / Management","Project Management","Communication & Storytelling","Pitching / Public Speaking","Negotiation & Partnerships"],exp:false,avail:"Exploring",commit:"Part-time",contact:"Undine.Evalde@outlook.com"},
  {id:38,name:"Aris Jansons",drives:["Achievement"],cog:"Structured",act:4,risk:4,learn:4,mission:"AI Agents for Compliance / RegTech",vals:"Impact",role:"Executor",dom:["Artificial Intelligence / Machine Learning","Product Management","Regulatory / Compliance","Marketing","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Product Management","Financial Modeling / Unit Economics","Team Leadership / Management","Recruitment / Talent Development","Project Management","Operations / Scaling Processes","Communication & Storytelling","Negotiation & Partnerships","B2B Sales"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:"aris.jansons@gmail.com"},
  {id:39,name:"Eva Einmane",drives:["Curiosity"],cog:"Analytical",act:3,risk:3,learn:4,mission:"Space / frontier tech",vals:"Integrity",role:"Generalist",dom:["Data Science / Analytics","Business Strategy / Commercialization","Marketing","Sales"],skills:["UX/UI Design","Quality Assurance / Testing","Go-to-Market Planning","Project Management","Communication & Storytelling","B2B Sales","B2C Sales"],exp:false,avail:"Exploring",commit:"Part-time",contact:"+371 28 686 497"},
  {id:40,name:"Raimonds Litaunieks",drives:["Achievement","Impact","Curiosity"],cog:"Structured",act:3,risk:3,learn:4,mission:"Digital inclusion / access",vals:"Quality",role:"Generalist",dom:["Product Management","Marketing","Sales"],skills:["UX/UI Design","Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Product Management","Team Leadership / Management","Recruitment / Talent Development","Project Management","Operations / Scaling Processes","Communication & Storytelling","Negotiation & Partnerships","B2B Sales","B2C Sales"],exp:false,avail:"Co-founder Ready",commit:"Part-time",contact:"LinkedIn: Raimonds Litaunieks"},
  {id:41,name:"Asmaa Dghoughi",drives:["Achievement","Impact"],cog:"Structured",act:3,risk:3,learn:5,mission:"Healthcare innovation / equity",vals:"Impact",role:"Analyst",dom:["Chemistry / Chemical Engineering","Nanotechnology","Healthcare Systems / Policy"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Quality Assurance / Testing","Grant Writing / Public Funding"],exp:false,avail:"Exploring",commit:"Part-time",contact:"asmaadghoughi8@gmail.com"},
  {id:42,name:"Raivo Kreicbergs",drives:["Achievement","Impact"],cog:"Creative",act:3,risk:4,learn:3,mission:"AI for good / ethical tech",vals:"Quality",role:"Visionary",dom:["Business Strategy / Commercialization","Marketing","Sales"],skills:["Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Fundraising / Investor Relations","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Operations / Scaling Processes","Communication & Storytelling","B2B Sales","Branding / Design"],exp:true,avail:"Co-founder Ready",commit:"Equity-only",contact:"linkedin.com/in/raivo"},
  {id:43,name:"Anita Rozentāle",drives:["Impact","Curiosity"],cog:"Creative",act:3,risk:3,learn:4,mission:"AI for good / ethical tech",vals:"Quality",role:"Executor",dom:["Product Management","Marketing"],skills:["Business Strategy","Market Research / Customer Discovery","Sales / Business Development","Product Management","Fundraising / Investor Relations","Team Leadership / Management","Recruitment / Talent Development","Project Management","Operations / Scaling Processes"],exp:true,avail:"Exploring",commit:"Part-time",contact:"Rozentaleanita@gmail.com"},
  {id:44,name:"Abiodun Samuel Adebowale",drives:["Impact","Curiosity"],cog:"Analytical",act:4,risk:4,learn:5,mission:"Healthcare innovation / equity",vals:"Impact",role:"Visionary",dom:["Biology / Biotech / Life Sciences","Medical Devices","Diagnostics / Imaging","Clinical Research / Trials","Business Strategy / Commercialization","Venture Building / Fundraising","Regulatory / Compliance"],skills:["R&D / Laboratory Research","Regulatory / Compliance","Quality Assurance / Testing","Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Fundraising / Investor Relations","Grant Writing / Public Funding","Negotiation & Partnerships"],exp:true,avail:"Co-founder Ready",commit:"Full-time",contact:"eurosporthub@proton.me"},
  {id:45,name:"Elmar Jafarzade",drives:["Curiosity","Recognition"],cog:"Creative",act:3,risk:2,learn:4,mission:"Security & infrastructure",vals:"Learning",role:"Analyst",dom:["Cybersecurity"],skills:["Software Development","Systems Architecture","Project Management"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:"elmarr1941@gmail.com"},
  {id:46,name:"Gunita Paidere",drives:["Achievement","Impact"],cog:"Analytical",act:4,risk:3,learn:5,mission:"Healthcare innovation / equity",vals:"Learning",role:"Analyst",dom:["Physics / Materials Science","Chemistry / Chemical Engineering","Medical Devices"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Quality Assurance / Testing","Grant Writing / Public Funding","Pitching / Public Speaking"],exp:true,avail:"Exploring",commit:"Part-time",contact:"+37126486365"},
  {id:47,name:"Marta Mūrniece",drives:["Autonomy","Curiosity"],cog:"Analytical",act:3,risk:3,learn:4,mission:"Digital inclusion / access",vals:"Quality",role:"Visionary",dom:["Product Management"],skills:["Prototyping / Engineering Design","UX/UI Design","Systems Architecture","Quality Assurance / Testing","Product Management","Team Leadership / Management"],exp:true,avail:"Part-Time",commit:"Part-time",contact:"linkedin.com/in/marta-murniece-55b179104/"},
  {id:48,name:"Terēze Ozolniece",drives:["Achievement","Impact"],cog:"Creative",act:2,risk:3,learn:4,mission:"Education & learning",vals:"Quality",role:"Visionary",dom:["Software Engineering"],skills:["Prototyping / Engineering Design","Software Development","UX/UI Design","Systems Architecture","Team Leadership / Management","Communication & Storytelling"],exp:true,avail:"Part-Time",commit:"Part-time",contact:"theresa.xys@gmail.com"},
  {id:49,name:"Janis Daniels Dzenis",drives:["Impact","Curiosity"],cog:"Analytical",act:3,risk:4,learn:4,mission:"Deep science translation",vals:"Impact",role:"Visionary",dom:["Biology / Biotech / Life Sciences","Mechanical / Industrial Engineering","Data Science / Analytics","Neuroscience / Cognitive Science","Business Strategy / Commercialization","Product Management","Venture Building / Fundraising","Marketing","Sales"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","UX/UI Design","Hardware Integration","Business Strategy","Market Research / Customer Discovery","Go-to-Market Planning","Sales / Business Development","Product Management","Fundraising / Investor Relations","Team Leadership / Management","Recruitment / Talent Development","Project Management","Communication & Storytelling","Pitching / Public Speaking","Legal / IP Strategy","Negotiation & Partnerships","B2B Sales","B2C Sales"],exp:true,avail:"Co-founder Ready",commit:"Full-time",contact:"Email"},
  {id:50,name:"Darija Podberecka",drives:["Autonomy","Impact","Curiosity"],cog:"Analytical",act:1,risk:3,learn:3,mission:"Healthcare innovation / equity",vals:"Impact",role:"Generalist",dom:["Physics / Materials Science","Mechanical / Industrial Engineering","Robotics / Mechatronics","Medical Devices","Product Management"],skills:["R&D / Laboratory Research","Prototyping / Engineering Design","Product Management","Project Management"],exp:true,avail:"Exploring",commit:"Equity-only",contact:"linkedin.com/in/dārija-podberecka"},
  {id:51,name:"Andris Murāns",drives:["Achievement","Autonomy","Impact","Curiosity"],cog:"Creative",act:3,risk:3,learn:4,mission:"Industrial transformation",vals:"Impact",role:"Visionary",dom:["Business Strategy / Commercialization"],skills:["Business Strategy","Grant Writing / Public Funding","Team Leadership / Management","Project Management","Operations / Scaling Processes","Negotiation & Partnerships"],exp:false,avail:"Co-founder Ready",commit:"Full-time",contact:"murans.andris@gmail.com"},
  {id:52,name:"Alla Bukuyazava",drives:["Autonomy","Impact"],cog:"Analytical",act:3,risk:3,learn:4,mission:"AI for good / ethical tech",vals:"Impact",role:"Visionary",dom:["Artificial Intelligence / Machine Learning","Business Strategy / Commercialization","Marketing"],skills:["Go-to-Market Planning","Team Leadership / Management","Project Management","Negotiation & Partnerships"],exp:true,avail:"Co-founder Ready",commit:"Part-time",contact:"alla.bukuyazava@gmail.com"},
];

function csvLine(line) {
  const f=[];let s='',q=false;
  for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){s+='"';i++;}else q=!q;}else if(c===','&&!q){f.push(s.trim());s='';}else s+=c;}
  f.push(s.trim());return f;
}
function rowToProfile(c,id){
  if(!c[1]||!c[3])return null;
  const sp=s=>s?s.split(/, ?/).map(x=>x.trim()).filter(Boolean):[];
  return{id,name:c[1].trim(),drives:sp(c[2]).length?sp(c[2]):["Impact"],cog:c[3].trim()||"Analytical",act:parseInt(c[4])||3,risk:parseInt(c[5])||3,learn:parseInt(c[6])||3,mission:(c[7]||"").trim()||"Not specified",vals:(c[8]||"").trim()||"Quality",role:(c[9]||"").trim()||"Generalist",dom:sp(c[12]),skills:sp(c[13]),exp:(c[14]||"").toLowerCase().includes("yes"),avail:(c[16]||"").trim()||"Exploring",commit:(c[17]||"").trim()||"Part-time",contact:[c[18],c[19]].filter(Boolean).map(x=>x.trim()).join(" · ")||""};
}
async function fetchProfiles(){
  const res=await fetch(SHEET_CSV);
  const text=await res.text();
  const lines=text.split('\n').filter(l=>l.trim());
  return lines.slice(1).map((l,i)=>rowToProfile(csvLine(l),i+1)).filter(Boolean);
}

const COG_M = {"Analytical-Creative":20,"Creative-Analytical":20,"Analytical-Intuitive":18,"Intuitive-Analytical":18,"Structured-Creative":18,"Creative-Structured":18,"Structured-Intuitive":15,"Intuitive-Structured":15,"Analytical-Structured":8,"Structured-Analytical":8,"Creative-Intuitive":10,"Intuitive-Creative":10};
const ROLE_M = {"Visionary-Executor":15,"Executor-Visionary":15,"Analyst-Visionary":12,"Visionary-Analyst":12,"Analyst-Executor":12,"Executor-Analyst":12,"Generalist-Visionary":10,"Visionary-Generalist":10,"Generalist-Executor":10,"Executor-Generalist":10,"Generalist-Analyst":8,"Analyst-Generalist":8};

function score(a, b) {
  const cog = a.cog === b.cog ? 0 : (COG_M[`${a.cog}-${b.cog}`] ?? 12);
  const aD = new Set(a.drives), bD = new Set(b.drives);
  const ov = [...aD].filter(d => bD.has(d)).length;
  const tot = new Set([...aD,...bD]).size;
  const drv = tot > 0 ? Math.round((1 - ov / tot) * 20) : 10;
  const aS = new Set(a.skills), bS = new Set(b.skills);
  const allS = new Set([...aS,...bS]);
  const sh = [...aS].filter(s => bS.has(s)).length;
  const skl = allS.size > 0 ? Math.round(((allS.size - sh) / allS.size) * 25) : 12;
  const rol = a.role === b.role ? 0 : (ROLE_M[`${a.role}-${b.role}`] ?? 8);
  const mA = a.mission.toLowerCase(), mB = b.mission.toLowerCase();
  const mis = mA === mB ? 20 : mA.split(/[\s/&,]+/).some(w => w.length > 4 && mB.includes(w)) ? 10 : 5;
  return {total: cog+drv+skl+rol+mis, cog, drv, skl, rol, mis};
}

function matchLabel(s) {
  if(s>=75) return {label:"Excellent",color:"#22C55E"};
  if(s>=60) return {label:"Strong",color:"#F59E0B"};
  if(s>=45) return {label:"Good",color:"#818CF8"};
  return {label:"Possible",color:"#64748B"};
}

function Tag({t, bg, col}) {
  return <span style={{display:"inline-block",padding:"2px 7px",borderRadius:4,fontSize:11,fontWeight:600,background:bg,color:col,margin:"2px 2px 2px 0",whiteSpace:"nowrap"}}>{t}</span>;
}

function Bar({label, val, max, color}) {
  return (
    <div style={{marginBottom:7}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:11,color:C.muted}}>{label}</span>
        <span style={{fontSize:11,fontWeight:600,color:C.text}}>{val}/{max}</span>
      </div>
      <div style={{height:3,background:C.bord,borderRadius:2}}>
        <div style={{height:"100%",width:`${val/max*100}%`,background:color,borderRadius:2,transition:"width .4s ease"}}/>
      </div>
    </div>
  );
}

function Avatar({p, size=40}) {
  const col = CC[p.cog]||C.indigo;
  return (
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:`${col}20`,border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:700,color:col,fontFamily:"'Syne',sans-serif"}}>
      {p.name.charAt(0)}
    </div>
  );
}

function Gate({onEnter}) {
  const [code,setCode] = useState("");
  const [err,setErr] = useState(false);
  const submit = () => {
    if(code.toLowerCase().trim()===ACCESS) onEnter();
    else { setErr(true); setTimeout(()=>setErr(false),1200); }
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg,fontFamily:"'Figtree',sans-serif"}}>
      <div style={{textAlign:"center",maxWidth:380,padding:"0 24px",animation:"fade .4s ease"}}>
        <div style={{marginBottom:36}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:C.accent}}/>
            <span style={{fontSize:11,letterSpacing:4,color:C.accent,fontWeight:700,fontFamily:"'Syne',sans-serif"}}>VENTURE CATALYSTS</span>
          </div>
          <h1 style={{fontSize:36,fontWeight:800,color:C.text,fontFamily:"'Syne',sans-serif",lineHeight:1.1,marginBottom:10}}>Team<br/>Intelligence</h1>
          <p style={{fontSize:13,color:C.muted,lineHeight:1.6}}>Deep-tech co-founder matching platform.<br/>Powered by the Drives + Cognitive + Skills model.</p>
        </div>
        <input
          type="password" placeholder="Enter access code" value={code}
          onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}
          style={{width:"100%",padding:"13px 16px",background:C.surf2,border:`1px solid ${err?"#FF5A5F":C.bord}`,borderRadius:10,color:C.text,fontSize:14,outline:"none",marginBottom:8,animation:err?"shake .3s ease":"none",transition:"border-color .2s"}}
        />
        {err && <p style={{fontSize:12,color:"#FF5A5F",marginBottom:8}}>Invalid access code</p>}
        <button onClick={submit} style={{width:"100%",padding:"13px",background:C.accent,border:"none",borderRadius:10,color:"#000",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Figtree',sans-serif",letterSpacing:.3}}>
          Enter Platform →
        </button>
        <p style={{fontSize:11,color:C.muted,marginTop:20,lineHeight:1.7}}>Access restricted to verified founders.<br/>Contact Venture Catalysts to request access.</p>
      </div>
    </div>
  );
}

function Card({p, onView, onMatch}) {
  const [h,setH] = useState(false);
  const av = AC[p.avail]||C.muted;
  return (
    <div onClick={()=>onView(p)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:C.surf,border:`1px solid ${h?C.accent:C.bord}`,borderRadius:12,padding:18,cursor:"pointer",transition:"border-color .15s,transform .15s",transform:h?"translateY(-2px)":"none",display:"flex",flexDirection:"column",gap:9,animation:"fade .3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <Avatar p={p} size={38}/>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:"'Syne',sans-serif",lineHeight:1.2}}>{p.name}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{RI[p.role]} {p.role} · {p.cog}</div>
          </div>
        </div>
        <span style={{fontSize:10,padding:"3px 8px",borderRadius:20,background:`${av}18`,color:av,border:`1px solid ${av}30`,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>
          {p.avail}
        </span>
      </div>
      <div>{p.drives.map(d=><Tag key={d} t={d} bg={`${DC[d]||C.accent}18`} col={DC[d]||C.accent}/>)}</div>
      <p style={{fontSize:12,color:C.muted,lineHeight:1.5,minHeight:34}}>{p.mission.length>58?p.mission.slice(0,58)+"…":p.mission}</p>
      <div>
        {p.dom.slice(0,2).map(d=><Tag key={d} t={d.split("/")[0].trim()} bg={C.surf2} col={C.muted}/>)}
        {p.dom.length>2&&<Tag t={`+${p.dom.length-2}`} bg={C.surf2} col={C.muted}/>}
      </div>
      <div style={{display:"flex",gap:12,fontSize:11,color:C.muted}}>
        <span>⚡ {p.act}/5</span><span>🎯 {p.risk}/5</span><span>📈 {p.learn}/5</span>
        <span style={{color:p.exp?"#22C55E":C.muted}}>{p.exp?"✓ Startup exp":"No exp"}</span>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={e=>{e.stopPropagation();onView(p);}} style={{flex:1,padding:"7px 0",borderRadius:6,border:`1px solid ${C.bord}`,background:"transparent",color:C.muted,fontSize:11,cursor:"pointer",transition:"color .15s"}} onMouseEnter={e=>e.target.style.color=C.text} onMouseLeave={e=>e.target.style.color=C.muted}>View Profile</button>
        <button onClick={e=>{e.stopPropagation();onMatch(p);}} style={{flex:1,padding:"7px 0",borderRadius:6,border:`1px solid ${C.accent}50`,background:`${C.accent}12`,color:C.accent,fontSize:11,cursor:"pointer",fontWeight:600}}>Find Matches →</button>
      </div>
    </div>
  );
}

function Browse({profiles, onView, onMatch, syncing, onSync}) {
  const [q,setQ]=useState("");
  const [fR,setFR]=useState("");
  const [fA,setFA]=useState("");
  const [fC,setFC]=useState("");
  const sel = (ph,val,set,opts) => (
    <select value={val} onChange={e=>set(e.target.value)} style={{background:C.surf2,border:`1px solid ${C.bord}`,color:val?C.text:C.muted,borderRadius:8,padding:"8px 12px",fontSize:12,cursor:"pointer",outline:"none",fontFamily:"'Figtree',sans-serif"}}>
      <option value="">{ph}</option>
      {opts.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
  const filtered = useMemo(()=>profiles.filter(p=>{
    if(fR&&p.role!==fR)return false;
    if(fA&&p.avail!==fA)return false;
    if(fC&&p.cog!==fC)return false;
    if(q){const lq=q.toLowerCase();return p.name.toLowerCase().includes(lq)||p.mission.toLowerCase().includes(lq)||p.dom.some(d=>d.toLowerCase().includes(lq))||p.skills.some(s=>s.toLowerCase().includes(lq))||p.drives.some(d=>d.toLowerCase().includes(lq));}
    return true;
  }),[q,fR,fA,fC]);
  const ready = profiles.filter(p=>p.avail==="Co-founder Ready").length;
  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Figtree',sans-serif",color:C.text}}>
      <div style={{background:C.surf,borderBottom:`1px solid ${C.bord}`,padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.accent}}/>
          <span style={{fontSize:11,letterSpacing:3,color:C.accent,fontWeight:700,fontFamily:"'Syne',sans-serif"}}>VENTURE CATALYSTS</span>
          <span style={{fontSize:13,color:C.muted,marginLeft:6}}>Team Intelligence</span>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:C.muted}}><b style={{color:C.text}}>{profiles.length}</b> profiles · <b style={{color:C.green}}>{ready}</b> ready</span>
          <button onClick={onSync} disabled={syncing} style={{padding:"5px 10px",borderRadius:6,border:`1px solid ${C.bord}`,background:"transparent",color:syncing?C.accent:C.muted,fontSize:11,cursor:syncing?"default":"pointer",fontFamily:"'Figtree',sans-serif",transition:"color .2s"}}>
            {syncing?"⟳ Syncing…":"⟳ Sync"}
          </button>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" style={{padding:"6px 12px",borderRadius:6,border:`1px solid ${C.accent}50`,background:`${C.accent}15`,color:C.accent,fontSize:11,fontWeight:600,textDecoration:"none",fontFamily:"'Figtree',sans-serif",whiteSpace:"nowrap"}}>
            + Submit your profile
          </a>
        </div>
      </div>
      <div style={{padding:"16px 24px",borderBottom:`1px solid ${C.bord}`,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
        <input placeholder="Search name, domain, skill, mission…" value={q} onChange={e=>setQ(e.target.value)}
          style={{flex:"1 1 220px",padding:"8px 14px",background:C.surf2,border:`1px solid ${C.bord}`,borderRadius:8,color:C.text,fontSize:13,outline:"none"}}/>
        {sel("All roles",fR,setFR,["Visionary","Executor","Analyst","Generalist"])}
        {sel("All availability",fA,setFA,["Co-founder Ready","Exploring","Part-Time"])}
        {sel("All cognitive styles",fC,setFC,["Analytical","Structured","Intuitive","Creative"])}
        {(fR||fA||fC||q)&&<button onClick={()=>{setQ("");setFR("");setFA("");setFC("");}} style={{padding:"8px 12px",borderRadius:8,border:`1px solid ${C.bord}`,background:"transparent",color:C.muted,fontSize:12,cursor:"pointer"}}>✕ Clear</button>}
        <span style={{fontSize:12,color:C.muted,marginLeft:"auto"}}>{filtered.length} result{filtered.length!==1?"s":""}</span>
      </div>
      <div style={{padding:"20px 24px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
        {filtered.map(p=><Card key={p.id} p={p} onView={onView} onMatch={onMatch}/>)}
        {!filtered.length&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:60,color:C.muted}}>No profiles match your filters.</div>}
      </div>
    </div>
  );
}

function Sec({title, children}) {
  return (
    <div style={{background:C.surf,border:`1px solid ${C.bord}`,borderRadius:10,padding:"14px 16px"}}>
      <div style={{fontSize:10,letterSpacing:2,color:C.accent,fontWeight:700,marginBottom:10,fontFamily:"'Syne',sans-serif"}}>{title}</div>
      {children}
    </div>
  );
}

function Detail({p, onBack, onMatch}) {
  const av = AC[p.avail]||C.muted;
  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Figtree',sans-serif",color:C.text}}>
      <div style={{background:C.surf,borderBottom:`1px solid ${C.bord}`,padding:"12px 24px",display:"flex",gap:10,alignItems:"center"}}>
        <button onClick={onBack} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:13,padding:0}}>← Back</button>
        <span style={{color:C.bord}}>|</span>
        <span style={{fontSize:13,color:C.muted}}>{p.name}</span>
      </div>
      <div style={{maxWidth:780,margin:"0 auto",padding:"28px 24px",animation:"fade .3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:14}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <Avatar p={p} size={60}/>
            <div>
              <h1 style={{fontSize:22,fontWeight:800,color:C.text,fontFamily:"'Syne',sans-serif",marginBottom:4}}>{p.name}</h1>
              <p style={{fontSize:13,color:C.muted}}>{RI[p.role]} {p.role} · {p.cog} thinker · {p.commit}</p>
              <div style={{marginTop:8}}>{p.drives.map(d=><Tag key={d} t={d} bg={`${DC[d]||C.accent}18`} col={DC[d]||C.accent}/>)}</div>
            </div>
          </div>
          <span style={{fontSize:12,padding:"6px 14px",borderRadius:20,background:`${av}15`,color:av,border:`1px solid ${av}40`,fontWeight:700}}>{p.avail}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
          {[{l:"Bias Toward Action",v:p.act,c:"#F59E0B"},{l:"Risk Tolerance",v:p.risk,c:"#EF4444"},{l:"Learning Agility",v:p.learn,c:"#22C55E"}].map(s=>(
            <div key={s.l} style={{background:C.surf2,border:`1px solid ${C.bord}`,borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{s.l}</div>
              <div style={{fontSize:22,fontWeight:700,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}<span style={{fontSize:12,color:C.muted}}>/5</span></div>
              <div style={{height:3,background:C.bord,borderRadius:2,marginTop:8}}><div style={{height:"100%",width:`${s.v/5*100}%`,background:s.c,borderRadius:2}}/></div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <Sec title="MISSION ORIENTATION"><p style={{fontSize:13,color:C.muted,lineHeight:1.7}}>{p.mission}</p></Sec>
          <Sec title="VALUES & CULTURE">
            <p style={{fontSize:13,color:C.muted,marginBottom:4}}>Work values: <span style={{color:C.text}}>{p.vals}</span></p>
            <p style={{fontSize:13,color:C.muted}}>Commitment: <span style={{color:C.text}}>{p.commit}</span></p>
          </Sec>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <Sec title="DOMAIN EXPERTISE"><div>{p.dom.map(d=><Tag key={d} t={d} bg={C.surf2} col={C.muted}/>)}</div></Sec>
          <Sec title="KEY SKILLS"><div>{p.skills.map(s=><Tag key={s} t={s} bg={`${C.indigo}15`} col={C.indigo}/>)}</div></Sec>
        </div>
        {p.contact&&<Sec title="CONTACT"><p style={{fontSize:13,color:C.text}}>{p.contact}</p></Sec>}
        <button onClick={()=>onMatch(p)} style={{marginTop:20,width:"100%",padding:"15px",background:`${C.accent}15`,border:`1px solid ${C.accent}50`,borderRadius:12,color:C.text,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'Figtree',sans-serif",transition:"background .2s"}} onMouseEnter={e=>e.target.style.background=`${C.accent}25`} onMouseLeave={e=>e.target.style.background=`${C.accent}15`}>
          ◈ Find Best Co-founders for {p.name.split(" ")[0]}
        </button>
      </div>
    </div>
  );
}

function Matches({seeker, profiles, onBack, onView}) {
  const [expl,setExpl] = useState({});
  const [load,setLoad] = useState({});
  const ranked = useMemo(()=>
    profiles.filter(p=>p.id!==seeker.id).map(p=>({p,...score(seeker,p)})).sort((a,b)=>b.total-a.total).slice(0,15)
  ,[seeker]);

  const getInsight = async (m) => {
    if(expl[m.p.id]||load[m.p.id]) return;
    setLoad(prev=>({...prev,[m.p.id]:true}));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:280,
        messages:[{role:"user",content:`You are a deep-tech team formation expert. In 2-3 sentences, explain why ${seeker.name} (${seeker.role}, ${seeker.cog} thinker, drives: ${seeker.drives.join("/")} mission: "${seeker.mission}") and ${m.p.name} (${m.p.role}, ${m.p.cog} thinker, drives: ${m.p.drives.join("/")} mission: "${m.p.mission}") would make strong co-founders. Focus on cognitive complementarity and skill gaps filled. Be specific and concise.`}]
      })});
      const d = await res.json();
      setExpl(prev=>({...prev,[m.p.id]:d.content?.[0]?.text||"Could not generate insight."}));
    } catch { setExpl(prev=>({...prev,[m.p.id]:"Error generating insight."})); }
    setLoad(prev=>({...prev,[m.p.id]:false}));
  };

  return (
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'Figtree',sans-serif",color:C.text}}>
      <div style={{background:C.surf,borderBottom:`1px solid ${C.bord}`,padding:"12px 24px",display:"flex",gap:10,alignItems:"center"}}>
        <button onClick={onBack} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:13,padding:0}}>← Back to directory</button>
      </div>
      <div style={{maxWidth:780,margin:"0 auto",padding:"28px 24px"}}>
        <div style={{background:C.surf,border:`1px solid ${C.accent}40`,borderRadius:12,padding:"16px 20px",marginBottom:24,display:"flex",gap:14,alignItems:"center",animation:"fade .3s ease"}}>
          <Avatar p={seeker} size={46}/>
          <div style={{flex:1}}>
            <div style={{fontSize:10,letterSpacing:2,color:C.accent,fontWeight:700,fontFamily:"'Syne',sans-serif",marginBottom:2}}>FINDING MATCHES FOR</div>
            <div style={{fontSize:18,fontWeight:800,color:C.text,fontFamily:"'Syne',sans-serif"}}>{seeker.name}</div>
            <div style={{fontSize:12,color:C.muted}}>{seeker.role} · {seeker.cog} · {seeker.drives.join(" + ")} · {seeker.mission.slice(0,50)}{seeker.mission.length>50?"…":""}</div>
          </div>
          <div style={{fontSize:11,color:C.muted,textAlign:"right",flexShrink:0}}>Top {ranked.length} matches<br/>by compatibility score</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {ranked.map((m,i)=>{
            const {label,color} = matchLabel(m.total);
            const e = expl[m.p.id], isL = load[m.p.id];
            return (
              <div key={m.p.id} style={{background:C.surf,border:`1px solid ${C.bord}`,borderRadius:12,padding:"16px 18px",animation:`fade .${3+i*0.5<9?3+i*0.5:9}s ease`}}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:C.muted,width:18,flexShrink:0,paddingTop:4,fontWeight:600}}>#{i+1}</span>
                  <Avatar p={m.p} size={40}/>
                  <div style={{flex:1,minWidth:180}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:2}}>
                      <span onClick={()=>onView(m.p)} style={{fontWeight:700,fontSize:14,color:C.text,fontFamily:"'Syne',sans-serif",cursor:"pointer",textDecoration:"none"}} onMouseEnter={e=>e.target.style.color=C.accent} onMouseLeave={e=>e.target.style.color=C.text}>{m.p.name}</span>
                      <span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:`${color}18`,color,border:`1px solid ${color}30`,fontWeight:700}}>{label} match</span>
                      {m.p.avail==="Co-founder Ready"&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:`${C.green}18`,color:C.green,border:`1px solid ${C.green}30`,fontWeight:600}}>Ready</span>}
                    </div>
                    <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{m.p.role} · {m.p.cog} · {m.p.drives.join("/")} · {m.p.commit}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
                      <Bar label="Cognitive diversity" val={m.cog} max={20} color="#38BDF8"/>
                      <Bar label="Drive diversity" val={m.drv} max={20} color="#818CF8"/>
                      <Bar label="Skill complement" val={m.skl} max={25} color="#22C55E"/>
                      <Bar label="Role fit" val={m.rol} max={15} color="#F472B6"/>
                      <Bar label="Mission alignment" val={m.mis} max={20} color="#F59E0B"/>
                    </div>
                    {e ? (
                      <div style={{marginTop:10,padding:"10px 12px",background:`${C.indigo}10`,border:`1px solid ${C.indigo}30`,borderRadius:8,fontSize:12,color:"#A5B4FC",lineHeight:1.7}}>
                        ✦ {e}
                      </div>
                    ) : (
                      <button onClick={()=>getInsight(m)} disabled={isL} style={{marginTop:8,padding:"5px 12px",borderRadius:6,border:`1px solid ${C.indigo}40`,background:`${C.indigo}10`,color:C.indigo,fontSize:11,cursor:isL?"default":"pointer",fontFamily:"'Figtree',sans-serif",fontWeight:600,opacity:isL?.6:1}}>
                        {isL?"Generating…":"✦ AI Match Insight"}
                      </button>
                    )}
                  </div>
                  <div style={{textAlign:"center",flexShrink:0,minWidth:56}}>
                    <div style={{fontSize:26,fontWeight:800,color,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{m.total}</div>
                    <div style={{fontSize:10,color:C.muted,marginBottom:8}}>/ 100</div>
                    <button onClick={()=>onView(m.p)} style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${C.bord}`,background:"transparent",color:C.muted,fontSize:10,cursor:"pointer"}}>View →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view,setView] = useState("gate");
  const [sel,setSel] = useState(null);
  const [seeker,setSeeker] = useState(null);
  const [profiles,setProfiles] = useState(P);
  const [syncing,setSyncing] = useState(false);
  const [fetched,setFetched] = useState(false);
  const sync = useCallback(async()=>{
    setSyncing(true);
    try{ const data=await fetchProfiles(); if(data.length>0) setProfiles(data); }catch(e){}
    setSyncing(false);
  },[]);
  useEffect(()=>{ if(view==="browse"&&!fetched){ setFetched(true); sync(); } },[view,fetched,sync]);
  const toView = useCallback(p=>{setSel(p);setView("detail");},[]);
  const toMatch = useCallback(p=>{setSeeker(p);setView("matches");},[]);
  if(view==="gate") return <Gate onEnter={()=>setView("browse")}/>;
  if(view==="browse") return <Browse profiles={profiles} onView={toView} onMatch={toMatch} syncing={syncing} onSync={sync}/>;
  if(view==="detail") return <Detail p={sel} onBack={()=>setView("browse")} onMatch={toMatch}/>;
  if(view==="matches") return <Matches seeker={seeker} profiles={profiles} onBack={()=>setView("browse")} onView={toView}/>;
}
