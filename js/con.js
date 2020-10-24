'use strict';

(function() {
  
  var $card = document.getElementById('card'), 
      $backButton = document.getElementById('top-bar__back-btn'), 
      $mainTab = document.getElementById('tabs__tab-main'), 
      $socialLinks = document.querySelectorAll('a[data-social]'), 
      $langLinks = document.querySelectorAll('#top-bar__lang-selector a');
  
  // Click on language links
  for ( var i = $langLinks.length - 1; i >= 0; i-- ) {
    
    $langLinks[i].onclick = function() {
      
      if ( !this.classList.contains('active') ) {
        var currentActiveLang = document.querySelector('#top-bar__lang-selector a.active');
        currentActiveLang.classList.remove('active');
        this.classList.add('active');
      }
      
    }
    
  }
  
  // Click on social links
  for ( var i = $socialLinks.length -1; i >= 0 ; i-- ) {
    
    $socialLinks[i].onclick = function() {
      
      $card.classList.add('white');
      
      createCircleOverlay(this);
      
      if ( !this.classList.contains('active') ) {
        var currentActiveIcon = document.querySelector('a[data-social].active'), 
            currentActiveTab = document.querySelector('.single-tab.active');
        
        if ( currentActiveIcon ) currentActiveIcon.classList.remove('active');
        currentActiveTab.classList.remove('active');
        
        var newActiveSocial = this.getAttribute('data-social');
        this.classList.add('active');
        document.querySelector('.single-tab[data-tab-name="' + newActiveSocial + '"]').classList.add('active');
        
      }
      
    }
    
  }
  
  $backButton.onclick = function() {
    if ( !$mainTab.classList.contains('active') ) reset();
    createCircleOverlay(this);
  }
  
  function reset() {
    
    var $activeTab = document.querySelector('.single-tab.active'), 
        $activeButton = document.querySelector('a[data-social].active');
    
    $card.classList.remove('white');
    $activeTab.classList.remove('active');
    $activeButton.classList.remove('active');
    $mainTab.classList.add('active');
    
  }
  
  function createCircleOverlay(elem) {
    
    var $color = elem.getAttribute('data-social'), 
        $circleOverlay = document.createElement('span'), 
        $elemBoundings = elem.getBoundingClientRect();
    
    $card.appendChild($circleOverlay);
    
    $circleOverlay.className += 'circle-overlay overlay-' + $color;
    $circleOverlay.style.top = ((elem.offsetTop + $elemBoundings.height / 2) - 750) + 'px';
    $circleOverlay.style.left = ((elem.offsetLeft + $elemBoundings.width / 2) - 750) + 'px';
    
  }
  
})();