console.log("Main script running");
window.addEventListener("DOMContentLoaded", async () => {
  const text = await fetch("../data/text.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the data here
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });

  const skills = await fetch("../data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      // Use the data here
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error:", error);
    });

  const fakePortfolio = [];

  // ------------------
  //header section
  // ------------------
  const div = document.createElement("div");
  div.className = "header container";
  document.body.appendChild(div);
  const headerDiv = document.querySelector(".header");

  // ad h1 to header section
  const h1 = document.createElement("h1");
  h1.textContent = text.section[0].name;
  headerDiv.appendChild(h1);

  // add span to header section
  const span = document.createElement("span");
  span.className = "sub-title";
  span.textContent = text.section[0].job;
  headerDiv.appendChild(span);

  // add button to header section
  const button = document.createElement("button");
  button.className = "btn";
  button.textContent = text.section[3].text;
  headerDiv.appendChild(button);

  // add about me text to header section
  const h2 = document.createElement("h2");
  h2.textContent = text.section[0].aboutMe;
  headerDiv.appendChild(h2);

  // add paragraff
  const p = document.createElement("p");
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
  const phoneSpan = document.createElement("span");
  const addressSpan = document.createElement("span");

  footerHeader.textContent = text.section[5].title;
  emailSpan.textContent = text.section[5].email;
  phoneSpan.textContent = text.section[5].phone;
  addressSpan.textContent = text.section[5].address;

  footer.className = "footer";
  footerContent.className = "footer-content";
  footerHeader.className = "footer-header";
  emailSpan.className = "footer-pill";
  phoneSpan.className = "footer-pill";
  addressSpan.className = "footer-pill";

  footer.appendChild(footerHeader);
  footer.appendChild(footerContent);
  footerContent.appendChild(emailSpan);
  footerContent.appendChild(phoneSpan);
  footerContent.appendChild(addressSpan);
  document.body.appendChild(footer);

  // ------------------
  // Utility
  // ------------------

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
    image.src = imgPath;
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
