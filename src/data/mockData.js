import { generateId } from '../utils/helpers';

const DESCRIPTIONS = {
  Food: [
    'Whole Foods Market', 'Chipotle lunch', 'Starbucks coffee', 'DoorDash delivery',
    'Trader Joe\'s groceries', 'Pizza Hut dinner', 'Subway sandwich', 'Farmers market',
    'Sushi restaurant', 'McDonald\'s breakfast',
  ],
  Transport: [
    'Uber ride', 'Gas station fill-up', 'Lyft to airport', 'Monthly metro pass',
    'Parking garage', 'Car wash', 'Toll charges', 'E-scooter rental',
  ],
  Shopping: [
    'Amazon purchase', 'Nike running shoes', 'IKEA furniture', 'Apple accessories',
    'Target essentials', 'Nordstrom sale', 'Best Buy electronics', 'Etsy crafts',
  ],
  Bills: [
    'Electric bill', 'Internet service', 'Phone bill', 'Water & sewage',
    'Rent payment', 'Insurance premium', 'Netflix subscription', 'Spotify premium',
  ],
  Entertainment: [
    'Movie tickets', 'Concert tickets', 'Bowling night', 'Escape room',
    'Museum entry', 'Amusement park', 'Streaming service', 'Game purchase',
  ],
  Salary: [
    'Monthly salary', 'Bi-weekly paycheck', 'Quarterly bonus', 'Annual bonus',
  ],
  Freelance: [
    'Web design project', 'Logo design', 'Consulting fee', 'Content writing',
    'App development', 'Photography gig',
  ],
  Other: [
    'ATM withdrawal', 'Gift purchase', 'Charity donation', 'Miscellaneous',
    'Cash deposit', 'Refund received',
  ],
};

const AMOUNT_RANGES = {
  Food: [5, 80],
  Transport: [3, 60],
  Shopping: [15, 250],
  Bills: [30, 200],
  Entertainment: [10, 120],
  Salary: [3000, 5500],
  Freelance: [200, 2000],
  Other: [10, 150],
};

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(startDate, endDate) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime).toISOString().split('T')[0];
}

export function generateTransactions(count = 60) {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const transactions = [];

  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];
  const incomeCategories = ['Salary', 'Freelance'];

  // Generate income transactions (1-2 per month for 6 months)
  for (let m = 0; m < 6; m++) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - 5 + m, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - 5 + m + 1, 0);

    // Monthly salary
    transactions.push({
      id: generateId(),
      date: randomDate(monthStart, new Date(monthStart.getFullYear(), monthStart.getMonth(), 5)),
      description: 'Monthly salary',
      category: 'Salary',
      amount: randomBetween(4000, 5200),
      type: 'income',
    });

    // Occasional freelance
    if (Math.random() > 0.4) {
      transactions.push({
        id: generateId(),
        date: randomDate(monthStart, monthEnd),
        description: randomItem(DESCRIPTIONS.Freelance),
        category: 'Freelance',
        amount: randomBetween(...AMOUNT_RANGES.Freelance),
        type: 'income',
      });
    }
  }

  // Generate expense transactions
  const remaining = count - transactions.length;
  for (let i = 0; i < remaining; i++) {
    const category = randomItem(expenseCategories);
    const [min, max] = AMOUNT_RANGES[category];

    transactions.push({
      id: generateId(),
      date: randomDate(sixMonthsAgo, now),
      description: randomItem(DESCRIPTIONS[category]),
      category,
      amount: randomBetween(min, max),
      type: 'expense',
    });
  }

  // Sort by date descending (newest first)
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return transactions;
}

export const initialTransactions = generateTransactions(60);
