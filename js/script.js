// TODO:
// 1. change gørlec idræts efterosklole text i text.json
// 2. change email done -> create new email
// 7. add work with me button functionality
// 8. add Linked / SOME ICONS


window.addEventListener("DOMContentLoaded", async () => {
  const env = {
    ROOT_PATH: "./",
  };

  // Make shift VanillaJS env variable
  if (document.URL.startsWith("https://haulund")) {
    env.ROOT_PATH = "https://haulund.github.io/portfolio24/"
  } 

  let text = await fetch(env.ROOT_PATH + "data/text.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the data here
      return data;
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });

  const skills = await fetch(env.ROOT_PATH + "data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the data here
      return data;
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });

  // ------------------
  //header section
  // ------------------
  const div = document.createElement("div");
  div.className = "header container";
  document.body.appendChild(div);
  const headerDiv = document.querySelector(".header");

  // grid container for header section
  const headerGrid = document.createElement("div");
  headerGrid.className = "header-grid";
  headerDiv.appendChild(headerGrid);
  // flags for language
  const flagsContainer = document.createElement("div");
  const dkAnchor = document.createElement("a");
  const ukAnchor = document.createElement("a");
  const danishFlag = document.createElement("img");
  const ukFlag = document.createElement("img");
  danishFlag.src = env.ROOT_PATH + "img/danish-flag.png";
  ukFlag.src = env.ROOT_PATH + "img/uk-flag.png";

  flagsContainer.className = "flags-container";
  danishFlag.className = "flag";
  ukFlag.className = "flag";
  
  dkAnchor.href = "#";
  dkAnchor.addEventListener("click", async () => {
    try {
      const data = await fetch(env.ROOT_PATH + "data/textDK.json")
        .then((response) => response.json());
      changeText(data) 
      
    } catch (error) {
      console.error("Error:", error);
    }

  });
  dkAnchor.appendChild(danishFlag);

  ukAnchor.href = "#";
  ukAnchor.addEventListener("click", async () => {
    try {
      const data = await fetch(env.ROOT_PATH + "data/text.json")
        .then((response) => response.json());
      changeText(data) 
    } catch (error) {
      console.error("Error:", error);
    }
  });
  ukAnchor.appendChild(ukFlag);

  flagsContainer.appendChild(ukAnchor);
  flagsContainer.appendChild(dkAnchor);
  headerGrid.appendChild(flagsContainer);

  // section for h1, span and button
  const headerSection = document.createElement("section");
  headerSection.className = "header-section";
  headerGrid.appendChild(headerSection);


  // ad h1 to header section
  const h1 = document.createElement("h1");
  h1.textContent = text.section[0].name;
  headerSection.appendChild(h1);

  // add span to header section
  const span = document.createElement("span");
  span.className = "sub-title";
  span.id = "sub-title";
  span.textContent = text.section[0].job;
  headerSection.appendChild(span);

  // add button to header section
  const button = document.createElement("button");
  button.className = "btn";
  button.id = "btn";
  button.textContent = text.section[3].text;
  button.addEventListener("click", () => {
    window.location.href = "mailto:steffen.haulund@gmail.com";
  });
  headerSection.appendChild(button);

  const img = document.createElement("img");
  img.className = "portrait";
  img.src = env.ROOT_PATH + "img/me.png";
  img.alt = "Steffen Haulund - Web Developer";
  headerGrid.appendChild(img);

  // add about me text to header section
  const h2 = document.createElement("h2");
  h2.id = "about-me-header";
  h2.textContent = text.section[0].aboutMe;
  headerDiv.appendChild(h2);

  // add paragraff
  const p = document.createElement("p");
  p.id = "about-me";
  p.textContent = text.section[0].aboutMeText;
  headerDiv.appendChild(p);

  // ------------------
  // skills section
  // ------------------
  // header for skills section
  const skillsheaderContainer = document.createElement("div");
  const skillsHeader = document.createElement("h2");
  skillsheaderContainer.className = "container";
  skillsHeader.textContent = text.section[1].title;
  skillsHeader.className = "skills-header";
  skillsheaderContainer.appendChild(skillsHeader);
  document.body.appendChild(skillsheaderContainer);

  // create div for skills section
  const skillsDiv = document.createElement("div");
  skillsDiv.className = "skills container";
  document.body.appendChild(skillsDiv);

  skills.skills.forEach((element) => {
    skillsDiv.appendChild(createSkillElement(element.name, element.img));
  });

  //-------------------
  // CV section
  //-------------------
  // header for CV section
  const cvHeaderContainer = document.createElement("div");
  const cvHeader = document.createElement("h2");
  cvHeaderContainer.className = "container";
  cvHeader.textContent = text.section[2].title || "CV";
  cvHeader.className = "skills-header";
  cvHeaderContainer.appendChild(cvHeader);
  document.body.appendChild(cvHeaderContainer);

  // container for CV section
  const cvContainerWrapper = document.createElement("div");
  const cvContainer = document.createElement("div");
  cvContainerWrapper.className = "cv-container-wrapper";

  cvContainerWrapper.appendChild(cvContainer);
  cvContainer.className = "cv-container container";
  document.body.appendChild(cvContainerWrapper);
  text.section[2].posts.forEach((element) => {
    cvContainer.appendChild(createCvRow(element.year, element.points, element.title));
  });

  // ------------------
  // Portfolio section
  // ------------------
  const PortfolioContainer = document.createElement("div");
  const PortfolioHeader = document.createElement("h2");
  const portfolioGrid = document.createElement("div");

  portfolioGrid.className = "portfolio-grid";
  PortfolioHeader.className = "skills-header";
  PortfolioContainer.className = "container";

  PortfolioHeader.textContent = text.section[4].title;
  for (let index = 1; index < 4; index++) {
    let img = await getRandomPicture(index); // get a random picture
    portfolioGrid.appendChild(img);
  }

  PortfolioContainer.appendChild(PortfolioHeader);
  PortfolioContainer.appendChild(portfolioGrid);
  document.body.appendChild(PortfolioContainer);

  // ------------------
  // footer section
  // ------------------
  const footer = document.createElement("footer");
  const footerContent = document.createElement("div");
  const footerHeader = document.createElement("h2");
  const emailSpan = document.createElement("span");
  const addressSpan = document.createElement("span");

  footerHeader.textContent = text.section[5].title;
  emailSpan.textContent = text.section[5].email;
  addressSpan.textContent = text.section[5].address;

  footer.className = "footer";
  footerContent.className = "footer-content";
  footerHeader.className = "footer-header";
  emailSpan.className = "footer-pill";
  addressSpan.className = "footer-pill";

  footer.appendChild(footerHeader);
  footer.appendChild(footerContent);
  footerContent.appendChild(emailSpan);
  footerContent.appendChild(addressSpan);
  document.body.appendChild(footer);

  // ------------------
  // Utility
  // ------------------

  // function to change text
  function changeText(data) {
    // change text in header section
    document.getElementById('sub-title').innerText = data.section[0].job;
    document.getElementById('btn').innerText = data.section[3].text;
    document.getElementById('about-me').innerText = data.section[0].aboutMeText;
    document.getElementById('about-me-header').innerText = data.section[0].aboutMe;
    // reset text in CV section
    cvContainer.innerHTML = "";
    // populatetext in CV section
    data.section[2].posts.forEach((element) => {
      cvContainer.appendChild(createCvRow(element.year, element.points, element.title));
    });
    //change text in footer section
    document.querySelector('.footer-header').innerHTML = data.section[5].title;
    document.querySelector('.footer-pill:nth-child(2)').innerHTML = data.section[5].address;
  }

  // utility function for creating a row in the CV section
  function createCvRow(year, postArray, title) {
    const row = document.createElement("div");
    row.className = "cv-row";

    // first grid column for year and graphic
    const cvGridOne = document.createElement("div");

    // content of first column
    const cvYear = document.createElement("p");
    cvYear.textContent = year;
    cvYear.className = "cv-year";
    cvGridOne.appendChild(cvYear);

    // second grid column for text
    const cvGridTwo = document.createElement("div");
    cvGridTwo.className = "cv-grid-two";

    // graphics middleCollumn
    const graphic = document.createElement("div");
    graphic.className = "graphic-div";
    const circle = document.createElement("div");
    circle.className = "circle";
    graphic.appendChild(circle);

    // content of second column
    // title for the post
    const cvTitle = document.createElement("div");
    cvTitle.textContent = title;
    cvTitle.className = "cv-title";
    cvGridTwo.appendChild(cvTitle);

    // content of the post
    const post = createPost(postArray);
    cvGridOne.className = "cv-grid-one";
    cvGridTwo.appendChild(post);

    row.appendChild(cvGridOne);
    row.appendChild(graphic);
    row.appendChild(cvGridTwo);
    return row;
  }

  // utility function for creating a post in the CV section
  function createPost(postArray) {
    const post = document.createElement("div");
    post.className = "cv-post";
    postArray.forEach((element) => {
      const p = document.createElement("p");
      p.textContent = element;
      post.appendChild(p);
    });
    return post;
  }

  // utility function for looping the creating of skill cards
  function createSkillElement(name, imgPath) {
    const skillsElement = document.createElement("div");
    skillsElement.className = "skill";
    const image = document.createElement("img");
    const span = document.createElement("span");
    span.textContent = name;
    image.src = env.ROOT_PATH + imgPath;
    image.alt = name;
    skillsElement.appendChild(image);
    skillsElement.appendChild(span);
    return skillsElement;
  }

  // function to get a random  picture
  async function getRandomPicture(index) {
    const image = document.createElement("img");
    image.src = "https://picsum.photos/400?random=" + index;
    return image;
  }
});
