const MEMBERS = [
  {name:"Alex",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Brian",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Bryan",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Danny",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Edwin",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Harvey",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"James",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"JP",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Kevin",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Steve",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Stewart",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0},
  {name:"Whitney",paid:0,totalDue:245,status:"Late",pastDue:245,dueNextWeek:245,aug31:0,jan10:0}
  ];

const FEES = {entry:245,transaction:1.45,secondKeeper:45,autodraft:5};

const WEEKLY_FIXED = [
  {date:"Sep 7, 2026",amount:49},
  {date:"Sep 21, 2026",amount:49},
  {date:"Oct 5, 2026",amount:49},
  {date:"Oct 19, 2026",amount:49},
  {date:"Nov 2, 2026",amount:49}
  ];

const RULES = [
  {title:"Keeper Rules",body:"- 2 keepers per team.\n- 1st keeper is free, the 2nd keeper is $45\n- The players kept will cost you 3 rounds prior to where he was drafted the season before.\n     - Example: if you keep a player drafted in the 4th round you'll lose your 1st round pick in the upcoming draft.\n     - Players drafted in the 1st, 2nd, and 3rd round can't be kept.\n     - If both players kept got drafted in the same round you'll lose 4 rounds for the 2nd keeper.\n          - Example: if you keep two players drafted in the 8th round you'll lose a 5th round pick and a 4th round pick.\n- If the player kept went undrafted you will lose the 7th pick.\n- Keeper must come from the roster that you finished the season with.\n- If a player goes on IR or is out for season he can only be kept if was kept in a roster for the last 7 weeks of the season.\n     - Exception: if a player comes back from IR prior to the fantasy regular season ending he can be kept the following season.\n- Keeper can only be kept for two seasons, after that he will become available to be drafted again."},
  {title:"Trade Review",body:"- All trades are subject to review by the commish. If there's any signs of collusion the commish has the right to veto the trade.\n     - During the trade review the commish can consult with his trade committee which consists of Ed, Tren, and Bayan.\n          - If any of the committee players are involved in the trade they won't be consulted.\n- If the commish is involved in a trade the duties of the commish outlined above will be delegated to Ed.\n     - If both the commish and Ed are involved in a trade then those duties will be handed over to Tren."},
  {title:"Survival",body:"- You must win survival alone, no tie breaker or splitting.\n     - In the event that someone doesn't win alone the $100 prize will be pushed to the following season.\n- The $100 from survival is funded by transaction fees."},
  {title:"Payments \u2014 The Weenie Rule",body:"- The Weenie Rule: this rule was established in 2021 after malapaga Weenie took forever to pay his fees.\n- If league fees aren't paid by the due date on the top table your team will be locked and all players benched until fees are paid.\n- Transaction fees will be due on a bi-weekly basis starting week 1, failure to comply will result in your team getting locked and all players benched until fees are paid."},
  {title:"Team Name on Trophy \u2014 Bayan vs Ed Scandal",body:"- Bayan vs Ed Scandal: Rule implemented in 2022 after the Bayan vs Ed scandal in 2021 where Bayan changed his name heading into the final to \"Edwin Dario Ruiz Loves Trump\".\n- If you win the championship the team name that gets displayed on the trophy is the one that was used the majority of the season."},
  {title:"Autodraft Punishment \u2014 The Zander Rule",body:"- The Zander Rule: this rule was established in 2023 after Zander the Clown autodrafted back to back years in 2021 & 2022.\n- Owners will be penalized $5 for every auto-drafted player (max 5 x 15 roster spots).\n     - This will only be waived if there's prior approval from the league members accepting the reasoning for not being able to do or complete the draft.\n- The money collected will be awarded to the team with the most points at the end of the regular season.\n     - If the team with the most points had over half the team autodrafted the price will go to the team with the most points that didn't violate this rule."},
  {title:"Last Place Punishment \u2014 The Tonj Rule",body:"- The Tonj Rule: the 'new' punishment was established after Tonj the Whiner had the punishment altered during the first two punishments in league history.\n- Last Place is defined as the team that is sitting in the 12th seed at the end of the Regular Season.\n- Punishment must be completed prior to the next fantasy draft.\n     - Failure to comply can result in a loss of their 1st round pick, 2nd round pick, and not being able to have any Keepers in the upcoming season.\n- Last place team will need to do the following:\n     - Wear an outfit of a clown, cowgirl, or fairy along with a 'Fantasy Loser' shirt. The non-losing owners will decide which of the 3 outfits.\n     - Location: Public place; TBD. Non-losing owners will decide the location.\n     - Duration: 7 hours. The only exception is if the event is shorter and the non-losing members agree to do a shorter time."},
  {title:"Draft Day Beer Bitch",body:"- If there's a new league member entering the league they must be 'beer bitch' on their inagural season starting an hour before the draft until the end of the draft.\n- If there's no new league member the player that gets last place the prior season will be beer bitch under the same conditions mentioned above.\n- In the event that the beer bitch is not present draft day they will be required to be beer bitch at a later event where most league members are present."}
  ];

const KEEPERS = [
  {player:"P. Nacua - WR",y2023:"",y2024:"x",y2025:"x - 4",owner:"Alex"},
  {player:"M. Nabers - WR",y2023:"",y2024:"",y2025:"x - 5",owner:"Alex"},
  {player:"B. Bowers - TE",y2023:"",y2024:"",y2025:"x - 6",owner:"Brian"},
  {player:"B. Thomas Jr - WR",y2023:"",y2024:"",y2025:"x - 7",owner:"Bryan"},
  {player:"C. Sutton - WR",y2023:"",y2024:"",y2025:"x - 9",owner:"Danny"},
  {player:"T. Higgins - WR",y2023:"",y2024:"",y2025:"x - 4",owner:"Danny"},
  {player:"B. Irving - RB",y2023:"",y2024:"",y2025:"x - 7",owner:"Edwin"},
  {player:"L. McConkey - WR",y2023:"",y2024:"",y2025:"x - 8",owner:"Edwin"},
  {player:"J. Downs - WR",y2023:"",y2024:"",y2025:"x - 7",owner:"Harvey"},
  {player:"C. Hubbard - RB",y2023:"",y2024:"",y2025:"x - 10",owner:"James"},
  {player:"J. Warren - RB",y2023:"",y2024:"x",y2025:"x - 8",owner:"JP"},
  {player:"C. Ridley - WR",y2023:"",y2024:"",y2025:"x - 5",owner:"JP"},
  {player:"C. Brown - RB",y2023:"",y2024:"",y2025:"x - 6",owner:"Kevin"},
  {player:"T. Hockenson - TE",y2023:"",y2024:"",y2025:"x - 10",owner:"Kevin"},
  {player:"D. Achane - RB",y2023:"",y2024:"x",y2025:"x - 4",owner:"Steve"},
  {player:"J. Addison - WR",y2023:"",y2024:"",y2025:"x - 10",owner:"Stewart"},
  {player:"J. Smith-Njigba - WR",y2023:"",y2024:"",y2025:"x - 7",owner:"Whitney"},
  {player:"J. Dobbins - RB",y2023:"",y2024:"",y2025:"x - 9",owner:"Whitney"},
  {player:"C. Godwin - WR",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"C. Olave - WR",y2023:"x",y2024:"x",y2025:"",owner:""},
  {player:"D. Kincaid - TE",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"D. London - WR",y2023:"x",y2024:"x",y2025:"",owner:""},
  {player:"G. Edwards - RB",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"G. Wilson - WR",y2023:"x",y2024:"x",y2025:"",owner:""},
  {player:"J. Cook - RB",y2023:"x",y2024:"x",y2025:"",owner:""},
  {player:"J. Ferguson - TE",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"J. Reed - WR",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"J. Williams - WR",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"K. Williams - RB",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"M. Evans - WR",y2023:"",y2024:"x",y2025:"",owner:""},
  {player:"T. McBride - TE",y2023:"",y2024:"x",y2025:"",owner:""}
  ];
