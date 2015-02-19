(function($) {

    $.fn.editablediv = function(options) {


        html='<div style="display:inline-flex" id="editablediv">\
                <div contenteditable="true" style="border:1px solid #DEDEDE;width:150px" class="editable-div"></div>\
                <div class="component"></div>\
                <div class="glyphicon glyphicon-pencil"  style="top:0;float:right" id="editicon"></div></div>\
                <div class="options">\
                   <div class="closeoptions thebutton"><span class="glyphicon glyphicon-remove"></span></div>\
                    <div class="saveoptions thebutton"><span class="glyphicon glyphicon-ok" ></span></div>\
                </div>'

        if(options.html){
            html = options.html
        }


        $(this).html(html)


        // console.info( $(element).closest(".glyphicon-pencil"))




    
        setTimeout(function() {
            $(element).find('div[contenteditable]').html(options.val)
            $(this).find('div[contenteditable]').css('border','1px solid #dedede')
            //$(element).find('.glyphicon-pencil').hide()
            $(element).find("#editicon").on('click',function(e){
                $(element).find('div[contenteditable]').focus()
            })
        }, 10);

        var element=this
        var old_value

        element.on('mouseenter',function(){
            //$(this).find('div[contenteditable]').css('border','1px solid #428bca')
             //$(this).find('.glyphicon-pencil').show()
        })

        element.on('mouseleave',function(){
            // $(this).find('div[contenteditable]').css('border','1px solid #dedede')
            // $(this).find('.glyphicon-pencil').hide()
        })

        // Enter/Escape to save/cancel
        element.on('keyup',function(event){
            if(event.keyCode == 13){
                event.preventDefault()  // prevent html code (<div> <br> etc) from being added
                $(element).find('.saveoptions').trigger('click')
            }else if(event.keyCode == 27){
                $(element).find('.closeoptions').trigger('click')
            }
        })


        //focusing on the editable div
        $(element).find('div[contenteditable]').on('focus',function(){
           
            setTimeout(function() {$(element).find('.options').css('display','block')}, 10);
            
            element._input=$(this);
            old_value = element._input.html();
            
            // $(document).find(".options").hide();
            //$(document).find(".glyphicon-pencil").hide();


            if(options.component){

                $(element).find('div[contenteditable]').hide();
                $(element).find('.component').html(options.component)
                $(element).find('.component').show()

                //$(element).find('div[contenteditable]').html(options.component)
                setTimeout(function() {
                    var myselect= $(element).find('.component select')
                    $(myselect).find('option:contains('+old_value+')').prop('selected', true);
                }, 10);

            }
        })

      
        /*
            limitation, commented because this wouldn't work with select boxes,
            will be fixed later when the new component will be added
        */
        
        // if (options.focusout_enabled == true){

        //   $(document).mouseup(function (e)
        //   {


        //       var container = new Array();
        //       container.push($('.editable-div'));
        //       //container.push($('.options'));

        //       $.each(container, function(key, value) {
        //           if (!$(value).is(e.target)  && $(value).has(e.target).length === 0) 
        //           {
        //               $(".options").hide();
        //           }
        //       });
        //   });
            
        // }


        $('.closeoptions').on('click',function(){

           if($(element).find('select').length>0){
                
                $(element).find('div[contenteditable]').show();
                 $(element).find('.component').hide();
               
           }else{
                $(element).find('div[contenteditable]').html(old_value)
           }
           $(element).find('.options').css('display','none')

        })

        $(element).find('.saveoptions').show()

        //user click on SAVE button
        $(element).find('.saveoptions').on('click',function(event){

            event.stopPropagation();
            
            $(element).find('.options').css('display','none')
            $(element).find('#editicon').css("background-color","red")

            //if the element added in a select
            if(options.component){
                element._input.trigger('saving', {value:element.find(".component select").val()} );
            }else{
                element._input.trigger('saving', {value:element._input.html()} );
            }
            if(options.actions){options.actions()}

        })

         this.disable=function(){
            $(element).find('div[contenteditable]').attr('contenteditable','false')

             //<div contenteditable="true" style="border:1px solid #DEDEDE;width:150px" class="editable-div"></div>
         }

         //loading is done
         //this is triggered from this outside of the compeonts
         this.done_loading=function(){
 
            $(element).find('#editicon').css("background-color","#F0F0F0")

            if(options.component){

                $(element).find('div[contenteditable]').show();
                $(element).find('div[contenteditable]').html(element.find(".component select option:selected").text())
                $(element).find('.component').hide()

            }     
         }

         function getinput(){
            return element._input
         }

         function getelement(){
            return this.element
         }

         return this

    }

}(jQuery));
