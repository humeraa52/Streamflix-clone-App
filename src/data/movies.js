const demo = name => `${import.meta.env.BASE_URL}videos/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.mp4`;

const base = [
  ['The Last Horizon',2026,8.7,'Sci-Fi','2h 18m','https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=85','A fearless pilot crosses a collapsing galaxy to bring humanity one final chance at survival.'],
  ['Neon City',2025,8.2,'Action','2h 05m','https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=85','A street racer uncovers a conspiracy hidden beneath a dazzling future city.'],
  ['Midnight Run',2025,7.9,'Thriller','1h 52m','https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85','One night. One mysterious package. One impossible route home.'],
  ['Wild Earth',2024,8.9,'Adventure','1h 47m','https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85','A journey through remote landscapes where every turn reveals something unexpected.'],
  ['Lost in Paris',2024,8.0,'Romance','1h 58m','https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85','Two strangers meet in Paris and discover that some stories begin by accident.'],
  ['The Deep',2025,8.5,'Adventure','2h 10m','https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85','A research crew descends into an unexplored ocean trench.'],
  ['Shadow House',2023,7.8,'Horror','1h 44m','https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=900&q=85','A new family home has a history no one wants to uncover.'],
  ['Laugh Track',2025,7.6,'Comedy','1h 36m','https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85','A chaotic group of friends turns every ordinary day into a comedy.'],
  ['Ocean Blue',2024,8.4,'Drama','2h 02m','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85','A quiet coastal story about family, choices and second chances.'],
  ['After Tomorrow',2026,8.1,'Sci-Fi','2h 21m','https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=85','A scientist receives a message from a future that should not exist.'],
  ['Night Driver',2025,8.3,'Action','1h 55m','https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85','A night-shift driver gets pulled into a city-wide chase.'],
  ['The Detective',2023,8.6,'Thriller','2h 08m','https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=900&q=85','A detective follows a trail of clues that keeps changing shape.'],
  ['Summer Letters',2024,7.7,'Romance','1h 49m','https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85','Old letters reconnect two people who thought their story had ended.'],
  ['Frozen Peak',2025,8.8,'Adventure','2h 16m','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85','A climbing team races the weather to reach an untouched summit.'],
  ['Crimson Sky',2026,8.0,'Drama','2h 00m','https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85','Three lives collide beneath one unforgettable sunset.'],
  ['Code Zero',2025,8.7,'Sci-Fi','1h 59m','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85','A student coder discovers a program that seems to predict tomorrow.']
];

const series = [
  ['Stranger Things',2025,9.0,'Sci-Fi','5 Seasons','https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg','A supernatural mystery series set around a small town and an extraordinary group of friends.'],
  ['Wednesday',2025,8.4,'Comedy','2 Seasons','https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg','A darkly funny mystery following Wednesday Addams at a strange new school.'],
  ['Squid Game',2025,8.6,'Thriller','3 Seasons','https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg','Contestants enter a mysterious competition where every decision changes the stakes.'],
  ['Money Heist',2021,8.2,'Thriller','5 Parts','https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg','A master planner assembles a team for an elaborate high-stakes heist.'],
  ['Dark',2020,8.7,'Sci-Fi','3 Seasons','https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg','A missing child reveals a mystery spanning generations.'],
  ['The Witcher',2025,8.0,'Adventure','4 Seasons','https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiOQ9sL4q9wJ3p2.jpg','A monster hunter travels through a dangerous world where destiny has its own plans.'],
  ['Arcane',2024,9.0,'Animation','2 Seasons','https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg','Two sisters find themselves on opposite sides of a growing conflict between cities.'],
  ['Black Mirror',2025,8.4,'Sci-Fi','7 Seasons','https://image.tmdb.org/t/p/w500/7PRddO7z7mcPi21nZTCMGShAyy1.jpg','A collection of stories exploring technology, society and unexpected consequences.'],
  ['Bridgerton',2026,8.1,'Romance','4 Seasons','https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg','Romance and secrets unfold inside London high society.'],
  ['Alice in Borderland',2025,8.5,'Thriller','3 Seasons','https://image.tmdb.org/t/p/w500/20mOwAAPwZ1vLQkw0fW8gJ7H7pP.jpg','A gamer and his friends find themselves trapped in a parallel Tokyo.'],
  ['Lucifer',2021,8.1,'Drama','6 Seasons','https://image.tmdb.org/t/p/w500/4EYPN5m8QUfYL0o5z3zGqJQ0Z3b.jpg','A charming nightclub owner becomes an unlikely crime-solving partner.'],
  ['One Piece',2026,8.7,'Adventure','1 Season','https://image.tmdb.org/t/p/w500/rVX05xRKS5JhEYQFObCi4lAnr2k.jpg','A young pirate gathers a crew and sets out toward a legendary treasure.'],
  ['The Crown',2023,8.6,'Drama','6 Seasons','https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8d6J0B.jpg','A sweeping historical drama about duty, family and public life.'],
  ['You',2025,8.1,'Thriller','5 Seasons','https://image.tmdb.org/t/p/w500/oANi0vEE92nuijiZQgPZ88FSxqQ.jpg','A psychological thriller about obsession, identity and the stories people tell themselves.'],
  ['The Umbrella Academy',2024,7.9,'Sci-Fi','4 Seasons','https://image.tmdb.org/t/p/w500/scZlQQYnDVlnpxFTxa19XPh7e5j.jpg','A dysfunctional family of gifted siblings reunites to stop a mysterious disaster.'],
  ['Cobra Kai',2022,8.4,'Action','6 Seasons','https://image.tmdb.org/t/p/w500/6POBWybSBDBKjSs1VAQcnQC1qyt.jpg','Old rivals reopen a dojo and discover a new generation of fighters.'],
  ['The Night Agent',2025,7.7,'Action','3 Seasons','https://image.tmdb.org/t/p/w500/x3zlm4f4V8n5g8l5lKJxqjPqJ3N.jpg','A low-level agent answers a phone that pulls him into a dangerous conspiracy.'],
  ['Manifest',2023,7.8,'Sci-Fi','4 Seasons','https://image.tmdb.org/t/p/w500/iiL1xlqFZJQdG0V5v2Y6L7c3p6k.jpg','A flight lands years after it departed, leaving passengers with impossible questions.'],
  ['The Sandman',2022,8.2,'Fantasy','2 Seasons','https://image.tmdb.org/t/p/w500/q54qEgagGOYCq5D1903eBVMNkbo.jpg','A mysterious immortal returns to restore a world of dreams.'],
  ['The Recruit',2022,7.5,'Action','2 Seasons','https://image.tmdb.org/t/p/w500/jgGmH9mQv1rj9vXw4V5pY8s8v2r.jpg','A young lawyer is thrown into an international intelligence crisis.'],
  ['The Queen’s Gambit',2020,8.5,'Drama','Limited Series','https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg','A chess prodigy finds her voice while navigating ambition and pressure.'],
  ['All of Us Are Dead',2022,7.5,'Horror','2 Seasons','https://image.tmdb.org/t/p/w500/pTEFqAjLd5YTsMD6NSUxV6Dq7A0.jpg','Students fight to survive after their school becomes the center of an outbreak.'],
  ['Locke & Key',2022,7.4,'Fantasy','3 Seasons','https://image.tmdb.org/t/p/w500/enzmE7r2mT8VfJ3W4xYJ6yXxH2u.jpg','Three siblings discover magical keys hidden inside their family home.'],
  ['Shadow and Bone',2023,7.6,'Fantasy','2 Seasons','https://image.tmdb.org/t/p/w500/1j6JqW6c7dZ8e9t0rP0nJ0Q0Q0Q.jpg','A mapmaker discovers a power that could change the fate of a divided world.']
];

export const movies = [...base, ...series].map((m, i) => ({
  id: i + 1, title:m[0], year:m[1], rating:m[2], genre:m[3], duration:m[4], image:m[5], description:m[6],
  hero: i < 4, videoUrl: demo(m[0]), videoWebmUrl: null,
  type: i >= base.length ? 'Series' : 'Movie'
}));

export const genres = ['All','Action','Adventure','Animation','Comedy','Drama','Fantasy','Horror','Romance','Sci-Fi','Thriller'];
