const searchPost = (category)=>{

      fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:" "}`)
 
    .then(res => res.json())
    .then(data => displayAllPost(data.posts))
    
}
const displayAllPost =((allpost)=>{
    console.log(allpost);
    const postcontainer= document.getElementById('post-container')
    postcontainer.innerHTML = ""
    allpost.forEach(post => {
        console.log(post)
        const card = document.createElement('div')
        card.innerHTML =`
         <div class="p-6 space-y-4 bg-[#F3F3F5] rounded-3xl">
  <div class="flex  gap-8">
  <div class="indicator">
  <span class="indicator-item badge  ${post.isActive?"bg-green-700":"bg-red-700"}"></span>
  <div class=""> <img class ="w-24 rounded-md h-24 indicator-item-badge" src=${post.image} alt=""></div>
</div>
   <div class="space-y-4">
    <div class="flex gap-5">
      <span class=" text-gray-400"># ${post.category}</span>
      <p class=" text-gray-400">Author: ${post.author.name}</p>
    </div>
    <h3 class="text-2xl font-bold text-gray-700">${post.title}</h3>
    <p class="border-dashed border-b-2 pb-3 text-gray-500">${post.description}</p>
   <div class= "flex justify-between">
    <div class="flex gap-8">
      <div class="flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=50&id=38977&format=png"/>
      <p class= "font-bold text-gray-600">${post.comment_count}</p>
      </div>
       <div class="flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=80&id=EXZilgeG6kKh&format=png"/>
      <p class= "font-bold text-gray-600">${post.view_count}</p>
      </div>
      <div class="flex gap-2"><img class = "w-5" src="https://img.icons8.com/?size=80&id=43419&format=png"/>
      <p class= "font-bold text-gray-600">${post.posted_time}</p>
      </div>
    </div>
    <div>
    <img onclick ="clickedPost('${post.description}','${post.view_count}')" id="btn-${post.id}" class="w-8 p-1 hover:bg-white bg-green-500 rounded-full clickedbtn" src="https://img.icons8.com/?size=80&id=gUUSatXjcqVA&format=png"/></div>

   </div>
   </div>
  </div>
  <div class="space-y-4 *:opacity-70" id="markAsReadContainer">
    <!-- dynamic content -->

    

  </div>
</div>`
postcontainer.appendChild(card)
        
    });

})
const clickedPost =((discription,view_count)=>{
    const clickedbtn = document.getElementsByClassName('clickedbtn')
    const addingcomment = document.getElementById('addingcomment')
    

        const addcomment = document.createElement('div')
        addcomment.innerHTML = `
        <div class="p-6 space-y-4 bg-[#F3F3F5] rounded-3xl">
              <div class="flex  items-center justify-between">
            <div class="">
            <h4 class="text-xl">${discription} </h4>
            <p>view${view_count}</p></div>
                <p class="opacity-50">
                  <i class="fa-solid fa-check-double text-green-500"></i> Mark
                  as read (<span id="markAsReadCounter"></span>)
                </p>
              </div>
              <div class="space-y-4 *:opacity-70" id="markAsReadContainer">
                <!-- dynamic content -->

                

              </div>
            </div>`
            addingcomment.append(addcomment)

    })
  





searchPost()

const searchPostDisplay = ()=>{
   
    const searchText =  document.getElementById('searchPosts').value 
   searchPost(searchText);

 
    

}



const loadPost = ()=>{
    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    .then(res => res.json())
    .then(data =>displayLoadPost(data))
    .catch(error => console.log(error))
}





const displayLoadPost = ((postAll) =>{
    console.log(postAll);
    const container = document.getElementById('container')
   for(element of postAll){ 
       console.log(element); 
       const card = document.createElement('div')
       
       card.innerHTML = ` <div class="card pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${element.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${(element.author.posted_date)?element.author.posted_date:"no date published"}
              </p>
              <h2 class="card-title text-start">${element.title}</h2>
              <p class="text-start">
                  ${element.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${element.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${element.author.name}</h3>
              <p class="text-start opacity-60">${(element.author.designation ?element.author.designation:"Unknown")}</p>
          </div>
      </div>
        

          <span
            id="latestPostLoader"
            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
          >
        

          
        
        
        </span>
          <!-- dynamic content -->
        </div>`
        container.appendChild(card)
    };
})



loadPost()
