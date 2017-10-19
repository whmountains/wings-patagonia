#!/usr/bin/env bash

echo "Creating _headers file"

cd build

cp -f _headers-tpl _headers

sed -i'' 's#GRAY_LOGO#'`ls static/media/logo-gray*`'#' _headers
sed -i'' 's#YOUTUBE_PLAY#'`ls static/media/youtube-play*`'#' _headers
sed -i'' 's#SCROLL_DOWN#'`ls static/media/scroll-down*`'#' _headers
