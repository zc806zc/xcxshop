<?php

namespace app\common\validate;

use think\Validate;

class Demo extends Validate
{
    protected $rule = [['title','require', '标题不能为空'],






    
    protected $scene = ["create"=>["title","orderby","photo","photos","details","cat_id",],"edit"=>["title","orderby","photo","photos","details","cat_id",]];
}