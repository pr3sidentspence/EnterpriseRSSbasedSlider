# EnterpriseRSSbasedSlider
This script takes the rss feed from an Enterprise search and outputs html in the format expected by bxSlider (https://bxslider.com) and then calls bxSlider.

It requires an unordered list `<ul>` with `id="bsSlider"` fololowed by a div with `id="bs-pager"` and the populateFeedData function needs to be called. E.g.,
  
```
<div>
   <ul id="bsSlider"></ul>
   <div id="bx-pager"></div>
</div>
<script type="text/javascript">
   populateFeedData();
</script>
```
