const ckeditor5_Convert = (endpoint) => {
  //嵌入影片
  endpoint = endpoint.replaceAll(
    '<figure class="media">',
    '<figure class="media" align=center>'
  );
  endpoint = endpoint.replaceAll(
    "<oembed",
    '<iframe width="767" height="431" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen'
  );
  endpoint = endpoint.replaceAll("</oembed>", "</iframe>");
  endpoint = endpoint.replaceAll('url="', 'src="');
  endpoint = endpoint.replaceAll("/watch?v=", "/embed/");
  //插入相片
  endpoint = endpoint.replaceAll(
    '<figure class="image">',
    '<figure class="image" align=center>'
  ); //完整尺寸
  endpoint = endpoint.replaceAll("<figcaption>", "<figcaption align=center>"); //標題

  return endpoint;
};

export default ckeditor5_Convert;
