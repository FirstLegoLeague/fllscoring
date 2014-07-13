<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fll="http://fll-tools.com/challenge.xsd">

    <xsl:template match="/">
        <html>
            <head>
                <style>
                    body {
                        font-family: verdana;
                        counter-reset: mission;
                    }
                    .mission {
                        border: 1px solid silver;
                        border-radius: 4px;
                        margin: 10px;
                        padding: 10px;
                        counter-increment: mission;
                    }
                    .mission h2:before  {
                        content: counter(mission);
                        border: 1px solid silver;
                        border-radius: 100px;
                        padding: 4px;
                        display: inline-block;
                        background-color: whitesmoke;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        margin-left: -25px;
                        margin-right: 10px;
                    }
                    .mission h2 {
                        font-size: inherit;
                        margin: 0;
                    }
                    .objective {
                        overflow: auto;
                    }
                    .objective .desc {
                        float: left;
                        margin-left: 20px;
                    }
                    .objective .values {
                        float: right;
                        font-weight: bold;
                    }
                    .objective .values span {
                        margin: 0 10px;
                    }
                </style>
            </head>
            <body>
                <h1><xsl:value-of select="/fll:challenge/@name"/></h1>
                <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>

    <xsl:template match="strings">
    </xsl:template>

    <xsl:template match="mission">
        <xsl:variable name="key" select="@name"/>
        <div class="mission">
            <h2>
                <xsl:value-of select="/fll:challenge/strings/string[@id=$key]"/>
            </h2>
            <xsl:apply-templates />
        </div>
    </xsl:template>

    <xsl:template match="objective-enum">
        <xsl:variable name="key" select="@description"/>
        <div class="objective">
            <span class="desc">
                <xsl:value-of select="/fll:challenge/strings/string[@id=$key]"/>
            </span>
            <span class="values">
                <xsl:for-each select="option">
                    <xsl:variable name="key2" select="@description"/>
                    <span><xsl:value-of select="/fll:challenge/strings/string[@id=$key2]"/></span>
                </xsl:for-each>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="objective-number">
        <xsl:variable name="key" select="@description"/>
        <div class="objective">
            <span class="desc">
                <xsl:value-of select="/fll:challenge/strings/string[@id=$key]"/>
            </span>
            <span class="values">
                <xsl:call-template name="numbers">
                    <xsl:with-param name="min" select="@min"/>
                    <xsl:with-param name="max" select="@max"/>
                </xsl:call-template>
            </span>
        </div>
    </xsl:template>

    <xsl:template match="objective-yesno">
        <xsl:variable name="key" select="@description"/>
        <div class="objective">
            <span class="desc">
                <xsl:value-of select="/fll:challenge/strings/string[@id=$key]"/>
            </span>
            <span class="values">
                <span>Yes</span>
                <span>No</span>
            </span>
        </div>
    </xsl:template>

    <xsl:template name="numbers">
        <xsl:param name="min" />
        <xsl:param name="max" />
        <xsl:if test="$min &lt;= $max">
            <span>
                <xsl:value-of select="$min"/>
            </span>

            <xsl:call-template name="numbers">
                <xsl:with-param name="min" select="$min+1"/>
                <xsl:with-param name="max" select="$max"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>
