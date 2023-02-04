<template>
    <div class="webgl">
        <div class="head">实验数据回传</div>
        <div class="content">
            <p class="title">1.1 http请求方式：POST/ x-www-form-urlencoded <span class="danger">注:表单提交</span></p>
            <p>示例：</p>
            <a href="https://ilab-x.jxust.edu/jxustapi/api/currency/record/receive">https://ilab-x.jxust.edu/jxustapi/api/currency/record/receive</a>
            <p class="title">1.2 参数说明：</p>
            <p class="danger">report：实验数据</p>
            <p>示例：</p>
            <p>
                <pre>
                    <code>
        {
            <span class="key">username：</span> <span class="string">"admin"</span>,
            <span class="key">score:</span> <span class="number">80</span>,
            <span class="key">startTime:</span> <span class="number">1522646936000</span>,
            <span class="key">endTime:</span> <span class="number">1522647936000</span>,
            <span class="key">timeUsed:</span> <span class="number">900</span>,
            <span class="key">appid:</span> <span class="number">3</span>,
            <span class="key">originId:</span> <span class="number">1</span>,
            <span class="key">steps:</span> [
                {
                    <span class="key">seq:</span> <span class="number">1</span>,
                    <span class="key">title:</span> <span class="string">"实验步骤 1"</span>,
                    <span class="key">startTime:</span> <span class="number">1522646936000</span>,
                    <span class="key">endTime:</span> <span class="number">1522647936000</span>,
                    <span class="key">timeUsed:</span> <span class="number">900</span>,
                    <span class="key">expectTime:</span> <span class="number">2</span>,
                    <span class="key">maxScore:</span> <span class="number">10</span>,
                    <span class="key">score:</span> <span class="number">10</span>,
                    <span class="key">repeatCount:</span> <span class="number">1</span>,
                    <span class="key">evaluation:</span> <span class="string">"优"</span>,
                    <span class="key">scoringModel:</span> <span class="string">"赋分 模型"</span>,
                    <span class="key">remarks:</span> <span class="string">"备注"</span>,
                }
                {}
                {}
                {}
            ]
        }
                    </code>
                </pre>
            </p>
            
            <p class="danger">des：华畅股份+时间戳 （数据需加密）</p>
            <p>加密方式:</p>
            <p class="danger">加密密钥：平台提供</p>
            <p class="danger">加密方式：des算法或cbc算法</p>
            <p class="danger">偏移量：平台提供</p>
            <p class="danger">填充：PAD_PKCS5</p>
            <p class="danger">输出方式：hex</p>
            <p class="danger">access_token：1.1获取用户信息及token时获取的token</p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
    .webgl {
        margin-left: 20px;
        .head {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .content {
            padding: 0 10px;
        }
        .danger {
            color: #f00;
        }
    }
    pre {
        border: 1px solid #eee;
        border-radius: 5px;
        background-color: #f5f5f5;
        font-size: 14px;
        .key {
            color: #0000d6;
        }
        .string {
            color: #ff9b05;
        }
        .number {
            color: #3fa100
        }
    }
    a {
        color: #2f7cee;
    }
</style>